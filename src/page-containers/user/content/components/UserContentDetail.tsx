"use client";

import LikeCmtBar from "@/components/contentLayout/LikeCmtBar";
import { useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

type ContentlayoutProps = {
  type: string;
};

const UserContentDetail: React.FC<ContentlayoutProps> = ({ type }) => {
  const { slug }: { slug: string } = useParams();
  const { data: contentData, mutate: contentMutate } = useGetContentBySlug<ContentData>(slug);

  return (
    <div className="flex-col  w-full  h-full no-scrollbar">
      {contentData && (
        <div className="w-full h-full">
          {" "}
          <div className="w-full mx-auto relative p-2">
            <Image
              src={contentData.data.image_url}
              className="w-full h-[200px]"
              width={358}
              height={200}
              alt={contentData.data.title}
            />
            <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg">
              {type}
            </div>
          </div>
          <div className="w-full px-[16px] bg-white">
            <div>
              <h1 className="font-[700] text-[24px]">{contentData.data.title}</h1>
              <div className="h-full min-h-[50vh]">
                {contentData.data.content_article && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contentData.data.content_article.article_body,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <LikeCmtBar data={contentData.data} mutate={contentMutate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContentDetail;
