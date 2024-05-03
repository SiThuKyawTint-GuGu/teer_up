"use client";
import CardBox from "@/components/ui/Card";
import { Text } from "@/components/ui/Typo/Text";
import "@/styles/video.css";
import { ContentData } from "@/types/Content";
import { setLocalStorage } from "@/utils";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import CardButton from "./CardButton";
import CardReactionBar from "./CardReactionBar";

type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  redir: string;
  contentListId?: string;
};

const BrowserContentLayout: React.FC<ContentlayoutProps> = ({ redir, data, contentMutate, contentListId }) => {
  const [comments, setComments] = useState<number>(0);
  const storeContentList = (id: string) => {
    setLocalStorage("contentListPosition", id);
  };
  useEffect(() => {
    setComments(data.comments);
  }, [data.comments]);

  return (
    <div className=" h-full p-2">
      <CardBox className="h-full">
        <div className="w-full h-full bg-white flex flex-col justify-between relative">
          <div
            className="flex flex-col"
            style={{
              height: "calc(100% - 50px) ",
            }}
          >
            <div className="w-full mx-auto  relative">
              {data.content_video ? (
                <div className="w-full h-[200px]">
                  {/* need to change cover to full screen fix-1 */}
                  <video
                    className="w-full h-full my-video"
                    poster={
                      data.image_url ||
                      "https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg"
                    }
                    preload="none"
                    data-video="0"
                    muted={false}
                    controls
                  >
                    <source src={data.content_video.video_url} className="object-fit" type="video/mp4"></source>
                  </video>
                </div>
              ) : (
                <Link
                  href={`/content/${data.slug}`}
                  onClick={() => {
                    contentListId && storeContentList(contentListId);
                  }}
                >
                  <div
                    className="relative w-full h-[200px]"
                    style={{
                      background: `url(${data.image_url}) center / cover`,
                    }}
                  >
                    {data.type !== "video" && (
                      <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] tracking-[0.42px] rounded-bl-rounded-bl-[8px] shadow-lg uppercase">
                        {data.type}
                      </div>
                    )}
                  </div>
                </Link>
              )}
            </div>
            <Link
              href={redir}
              className="inline-block h-full"
              onClick={() => {
                contentListId && storeContentList(contentListId);
              }}
            >
              <div className="w-full px-[12px] p-3 bg-white cursor-pointer">
                <h1 className="font-[600] text-[21px]">
                  {data.title.slice(0, 26)}{" "}
                  {data.title.length > 26 && (
                    <Text as="span" className="">
                      {"..."}
                    </Text>
                  )}
                </h1>
                {data.description && (
                  <div className="w-full h-full mt-2">
                    <div className="flex flex-col w-full">
                      <Text size="md">
                        {data.description.slice(0, 43)}

                        {data.description.length > 43 && (
                          <Text as="span" className="">
                            {"..."}
                          </Text>
                        )}
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
          <div className="w-full  px-[12px]">
            {/* <div className="w-full pt-3">
              <hr className="w-full h-[1px] bg-slateGray" />
            </div> */}
            <div className=" absolute top-0">
              <CardReactionBar data={data} contentMutate={contentMutate} comments={comments} setComments={setComments} />
            </div>
            <div className="mb-3">
              <CardButton/>
            </div>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default BrowserContentLayout;
