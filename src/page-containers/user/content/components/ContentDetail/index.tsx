"use clitent";

import LikeCmtBar from "@/components/contentLayout/LikeCmtBar";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { ContentData, ContentKeywords } from "@/types/Content";
import { Flex, Grid } from "@radix-ui/themes";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
type NormalContentDetailProp = {
  data: ContentData;
  contentMutate: any;
};
const NormalContentDetail: React.FC<NormalContentDetailProp> = ({ data, contentMutate }) => {
  const [comments, setComments] = useState<number>(0);
  useEffect(() => {
    setComments(data.comments);
  }, [data.comments]);
  return (
    <>
      {data && (
        <Grid columns="1" className="w-full h-[calc(100dvh-96px)]  overflow-y-auto no-scrollbar bg-layout">
          <div className="w-full h-full  no-scrollbar justify-center items-center">
            {" "}
            <div className={`w-full mx-auto ${data.type !== "mentor" ? "h-[200px]" : "h-[300px]"}  relative p-2`}>
              <div
                className="relative w-full max-w-[400px]  rounded-lg h-full"
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
            <div className="w-full px-[16px]">
              <div className="w-full">
                <h1 className="font-[700] text-[24px]">{data?.title}</h1>
                <div className="w-full  flex flex-col flex-wrap gap-y-3 ">
                  {data.type !== "opportunity" && data.type !== "article" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                    />
                  )}
                  {data?.content_article && (
                    <section
                      dangerouslySetInnerHTML={{
                        __html: data?.content_article.body,
                      }}
                    />
                  )}
                  {data?.content_opportunity && (
                    <section
                      dangerouslySetInnerHTML={{
                        __html: data?.content_opportunity.body,
                      }}
                    />
                  )}
                  <Flex gap="3">

                    {data.content_keywords.length > 0 &&
                      data.content_keywords.map((key: ContentKeywords, index: number) => (
                        <Text className="text-primary font-[600] text-[16px]" key={index}>
                          #{key.keyword.keyword}
                        </Text>
                      ))}
                  </Flex>
                  {data?.content_event && (
                    <div className="flex flex-wrap gap-x-2 items-center text-[16px] font-[700]">
                      <Icons.location className="w-[20px] h-[20px]" />
                      {data?.content_event.location}
                    </div>
                  )}
                  {data?.content_event && (
                    <div className="flex flex-wrap gap-x-2 items-center justify-start  text-[16px] font-[700]">
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
            <div className="w-full fixed bottom-0 max-w-[400px] z-[999]">
              {data && <LikeCmtBar data={data} mutate={contentMutate} comments={comments} setComments={setComments} />}
            </div>
          </div>
        </Grid>
      )}
    </>
  );
};

export default NormalContentDetail;
