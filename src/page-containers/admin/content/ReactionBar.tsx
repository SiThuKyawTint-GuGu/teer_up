import CommentSection from "@/components/contentLayout/CommentSection";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import React, { useState } from "react";
import Share from "./Share";
type ReactionBarProp = {
  data: ContentData;
  contentMutate: any;
};
const ReactionBar: React.FC<ReactionBarProp> = ({ data, contentMutate }) => {
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();
  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };

  const saveContent = async () => {
    await contentSave(
      {
        id: data.id,
      },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };
  return (
    <div className="flex justify-between items-center p-3 w-full">
      <button className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
        {data.is_liked ? (
          <Icons.likefill className="w-[20px] h-[20px] text-primary" />
        ) : (
          <Icons.like className="w-[20px] h-[20px]" />
        )}
        <div>
          {""}
          {data.likes}
        </div>
      </button>
      <Dialog open={openComment} onOpenChange={val => setOpenComment(val)}>
        <DialogTrigger>
          <div className="flex items-center flex-wrap gap-x-[10px]">
            <Icons.comment className="w-[20px] h-[20px]" />
            <div>
              {""}
              {data.comments}
            </div>
          </div>
        </DialogTrigger>
        {openComment && (
          <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
            <CommentSection data={data} mutateParentData={contentMutate} />
          </DialogContent>
        )}
      </Dialog>

      <button className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
        {data.is_saved ? (
          <Icons.savedFill className="w-[20px] h-[20px] text-primary" />
        ) : (
          <Icons.saved className="w-[20px] h-[20px]" />
        )}

        <div>
          {""}
          {data.saves}
        </div>
      </button>
      <Dialog open={openShare} onOpenChange={val => setOpenShare(val)}>
        <DialogTrigger>
          <button className="flex items-center flex-wrap gap-x-1" onClick={() => setOpenShare(true)}>
            <Icons.share className="w-[20px] h-[20px]" />
            <div>
              {""}
              Share
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
          {openShare && <Share url={`/content/${data.slug}`} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReactionBar;
