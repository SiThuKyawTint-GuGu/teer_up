import { Icons } from "@/components/ui/Images";
import { useLikeContent } from "@/services/content";
import "@/styles/video.css";
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

const BrowserContentLayout: React.FC<ContentlayoutProps> = ({ children, data, contentMutate }) => {
  const { trigger: like } = useLikeContent();
  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Dialog open={openModal} onOpenChange={val => setOpenModal(val)}>
      <div className="w-full h-full">
        <div className="w-full mx-auto relative p-2">
          {data.content_video ? (
            <div className="video-container">
              <video
                className="w-full h-[200px] my-video"
                id="myVideo"
                poster={
                  data.content_video.thumbnail ||
                  "https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg"
                }
                preload="none"
                data-video="0"
                muted={false}
                controls
              >
                <source
                  src={data.content_video.video_url}
                  className="object-fill"
                  type="video/mp4"
                ></source>
              </video>
              <div className="video-text-container">{data.title}</div>
            </div>
          ) : (
            <Image
              src={data.image_url}
              className="w-[100vw] h-[200px]"
              width={358}
              height={200}
              alt={data.title}
            />
          )}
          {data.type !== "video" && (
            <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg uppercase">
              {data.type}
            </div>
          )}
        </div>
        <div className="w-full px-[16px] bg-white">
          <div>
            <h1 className="font-[700] text-[24px]">{data.title}</h1>
            <div className="h-[10vh]">{children}</div>
          </div>

          <div className="flex justify-between p-3">
            <div className="flex items-center flex-wrap gap-x-[10px]">
              <Icons.like className="w-[20px] h-[20px]" onClick={likePost} />
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
            <div className="flex items-center flex-wrap gap-x-[10px]">
              <Icons.saved className="w-[20px] h-[20px]" />
              <div>{""}0</div>
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
      {openModal && (
        <DialogContent className="absolute top-[initial] bottom-0 w-full z-[999999]  bg-white">
          <CommentSection data={data} mutateParentData={contentMutate} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default BrowserContentLayout;
