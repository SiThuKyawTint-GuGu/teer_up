import CardBox from "@/components/ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useLikeContent } from "@/services/content";
import "@/styles/video.css";
import { ContentData } from "@/types/Content";
import Link from "next/link";

import React, { useState } from "react";
import CommentSection from "../../../../components/contentLayout/CommentSection";

type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  redir: string;
};

const BrowserContentLayout: React.FC<ContentlayoutProps> = ({ redir, data, contentMutate }) => {
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
      <div className="w-full h-full p-2">
        <CardBox>
          <div className="w-full h-full bg-white">
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
                    <source src={data.content_video.video_url} className="object-fill" type="video/mp4"></source>
                  </video>
                </div>
              ) : (
                <div
                  className="relative w-full h-[200px]"
                  style={{
                    background: `url(${data.image_url}) center / cover`,
                  }}
                >
                  {data.type !== "video" && (
                    <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg uppercase">
                      {data.type}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <Link href={redir}>
                <div className="w-full px-[16px] bg-white cursor-pointer">
                  <h1 className="font-[700] text-[24px]">{data.title}</h1>
                  {data.description && (
                    <div className="w-full h-full">
                      <div className="flex flex-col w-full">
                        <Text>
                          {data.description.slice(0, 100)}

                          {data.description.length > 100 && (
                            <Text as="span" className="text-primary">
                              {"..."}See more
                            </Text>
                          )}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
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
        </CardBox>
      </div>

      {openModal && (
        <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
          <CommentSection data={data} mutateParentData={contentMutate} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default BrowserContentLayout;
