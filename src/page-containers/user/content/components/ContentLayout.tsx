import { Icons } from "@/components/ui/Images";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { useState } from "react";
import CommentSection from "../../../../components/contentLayout/CommentSection";

type ContentlayoutProps = {
  children: React.ReactNode;
  data: ContentData;
  contentMutate: any;
};

const ContentLayout: React.FC<ContentlayoutProps> = ({ children, data, contentMutate }) => {
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();

  const [openModal, setOpenModal] = useState<boolean>(false);
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
    <Dialog open={openModal} onOpenChange={val => setOpenModal(val)}>
      <div className="w-full h-full">
        <div className="w-full mx-auto relative p-2">
          <Image
            src={data.image_url}
            className="w-full"
            width={400}
            height={200}
            alt={data.title}
          />
          <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg uppercase">
            {data.type}
          </div>
        </div>
        <div className="w-full h-full px-[16px] bg-white">
          <div className="w-full h-full">
            <h1 className="font-[700] text-[24px]">{data.title}</h1>
            <div className="h-[40%]">{children}</div>
            <div className="flex justify-between p-3 w-full">
              <div className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
                {data.is_liked ? (
                  <Icons.likefill className="w-[20px] h-[20px] text-primary" />
                ) : (
                  <Icons.like className="w-[20px] h-[20px]" />
                )}
                <div>
                  {""}
                  {data.likes}
                </div>
              </div>
              <DialogTrigger>
                <div className="flex items-center flex-wrap gap-x-[10px]">
                  <Icons.comment className="w-[20px] h-[20px]" />
                  <div>
                    {""}
                    {data.comments}
                  </div>
                </div>
              </DialogTrigger>
              <div className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
                {data.is_saved ? (
                  <Icons.savedFill className="w-[20px] h-[20px] text-yellow-400" />
                ) : (
                  <Icons.saved className="w-[20px] h-[20px]" />
                )}

                <div>
                  {""}
                  {data.saves}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-x-1">
                <Icons.share className="w-[20px] h-[20px]" />
                <div>
                  {""}
                  Share
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <DialogContent className="absolute top-[initial] bottom-0 w-full  bg-white">
          <CommentSection data={data} mutateParentData={contentMutate} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ContentLayout;
