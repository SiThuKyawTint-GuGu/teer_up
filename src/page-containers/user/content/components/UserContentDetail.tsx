"use client";

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
  const { data: contentData } = useGetContentBySlug<ContentData>(slug);
  console.log(contentData);

  return (
    <div className="w-full h-full">
      {contentData && (
        <>
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
              <div className="h-[40vh]">
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
        </>
      )}
    </div>
  );
};

export default UserContentDetail;
