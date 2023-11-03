"use clitent";

import LikeCmtBar from "@/components/contentLayout/LikeCmtBar";
import { Icons } from "@/components/ui/Images";
import { ContentData } from "@/types/Content";

import dayjs from "dayjs";
import React from "react";
type NormalContentDetailProp = {
  data: ContentData;
  contentMutate: any;
};
const NormalContentDetail: React.FC<NormalContentDetailProp> = ({ data, contentMutate }) => {
  return (
    <>
      {data && (
        <div className="w-full min-h-[90vh] bg-white pb-[70px]">
          {" "}
          <div className="w-full mx-auto h-[200px] relative p-2">
            <div
              className="relative w-full max-w-[400px] rounded-lg h-full"
              style={{
                background: `url(${data?.image_url}) center / cover`,
              }}
            >
              {data.type !== "video" && (
                <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg uppercase">
                  {data?.type}
                </div>
              )}
            </div>
          </div>
          <div className="w-full px-[16px] bg-white">
            <div className="w-full">
              <h1 className="font-[700] text-[24px]">{data?.title}</h1>
              <div className="w-full flex flex-col flex-wrap gap-y-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }}
                />
                {data?.content_article && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.content_article.body,
                    }}
                  />
                )}
                {data?.content_opportunity && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.content_opportunity.body,
                    }}
                  />
                )}

                {data?.content_event && (
                  <div className="flex flex-wrap gap-x-2 items-center text-[16px] font-[700]">
                    <Icons.location className="w-[20px] h-[20px]" />
                    {data?.content_event.location}
                  </div>
                )}
                {data?.content_event && (
                  <div className="flex flex-wrap gap-x-2 items-center  text-[16px] font-[700]">
                    <Icons.calender className="w-[20px] h-[20px]" />
                    {dayjs(data?.content_event.to_datetime).format("D MMMM")}
                  </div>
                )}
                {data?.content_opportunity && (
                  <div className="flex flex-wrap gap-x-2 items-center text-[16px] font-[700]">
                    <Icons.location className="w-[20px] h-[20px]" />
                    {data?.content_opportunity.location || "Yangon"}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full fixed bottom-0 max-w-[400px]">
            <LikeCmtBar data={data} mutate={contentMutate} />
          </div>
        </div>
      )}
    </>
  );
};

export default NormalContentDetail;
