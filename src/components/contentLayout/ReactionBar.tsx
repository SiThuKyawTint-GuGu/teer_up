import CommentSection from "@/components/contentLayout/CommentSection";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import React, { useEffect, useState } from "react";
import Share from "../../page-containers/admin/content/Share";
type ReactionBarProp = {
  data: ContentData;
  contentMutate: any;
};
const ReactionBar: React.FC<ReactionBarProp> = ({ data, contentMutate }) => {
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();
  const [reaction, setReacion] = useState({
    likes: 0,
    is_like: false,
    saves: 0,
    is_save: false,
  });

  useEffect(() => {
    setReacion(prev => ({
      ...prev,
      ["saves"]: data.saves,
      ["is_save"]: data.is_saved,
      ["likes"]: data.likes,
      ["is_like"]: data.is_liked,
    }));
  }, [data]);

  const likePost = async () => {
    if (reaction.is_like) {
      setReacion(prev => ({ ...prev, ["likes"]: prev.likes - 1, ["is_like"]: false }));
    }
    if (!reaction.is_like) {
      setReacion(prev => ({ ...prev, ["likes"]: prev.likes + 1, ["is_like"]: true }));
    }

    await like({ id: data.id });
  };

  const saveContent = async () => {
    if (reaction.is_save) {
      setReacion(prev => ({ ...prev, ["saves"]: prev.saves - 1, ["is_save"]: false }));
    }
    if (!reaction.is_save) {
      setReacion(prev => ({ ...prev, ["saves"]: prev.saves + 1, ["is_save"]: true }));
    }
    await contentSave({
      id: data.id,
    });
  };
  return (
    <div className="w-full py-2">
      <div className="flex justify-between items-center">
        <button className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
          {reaction.is_like ? (
            <Icons.likefill className="w-[20px] h-[20px] text-primary" />
          ) : (
            <Icons.like className="w-[20px] h-[20px]" />
          )}
          <div className={reaction.is_like ? "text-primary" : ""}>
            {""}
            {reaction.likes}
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
              <CommentSection data={data} mutateParentData={contentMutate} total={data.comments} />
            </DialogContent>
          )}
        </Dialog>

        <button className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
          {reaction.is_save ? (
            <Icons.savedFill className="w-[20px] h-[20px] text-primary" />
          ) : (
            <Icons.saved className="w-[20px] h-[20px]" />
          )}

          <div className={reaction.is_save ? "text-primary" : ""}>
            {""}
            {reaction.saves}
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
          <DialogContent className="bg-white top-[initial]  bottom-0 max-w-[400px] px-4  translate-y-0 rounded-10px-tl-tr">
            {openShare && <Share url={`/content/${data.slug}`} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReactionBar;
