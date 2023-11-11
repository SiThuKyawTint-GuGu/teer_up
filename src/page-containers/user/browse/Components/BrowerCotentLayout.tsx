import ReactionBar from "@/components/contentLayout/ReactionBar";
import CardBox from "@/components/ui/Card";
import { Text } from "@/components/ui/Typo/Text";
import "@/styles/video.css";
import { ContentData } from "@/types/Content";
import Link from "next/link";

import React from "react";

type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  redir: string;
};

const BrowserContentLayout: React.FC<ContentlayoutProps> = ({ redir, data, contentMutate }) => {
  return (
    <div className="w-full h-full p-2">
      <CardBox>
        <div className="w-full h-full bg-white">
          <div className="w-full mx-auto relative">
            {data.content_video ? (
              <div className="w-full h-[200px]">
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
              <Link href={`/content/${data.slug}`}>
                <div
                  className="relative w-full h-[200px]"
                  style={{
                    background: `url(${data.image_url}) center / cover`,
                  }}
                >
                  {data.type !== "video" && (
                    <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] tracking-[0.42px] rounded-bl-lg shadow-lg uppercase">
                      {data.type}
                    </div>
                  )}
                </div>
              </Link>
            )}
          </div>
          <Link href={redir}>
            <div className="w-full px-[12px] bg-white cursor-pointer">
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
          <div className="w-full h-full px-[12px]">
            <div className="w-full pt-3">
              <hr className="w-full h-[1px] bg-slateGray" />
            </div>
            <ReactionBar data={data} contentMutate={contentMutate} />
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default BrowserContentLayout;
