"use client";

import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import LikeCmtBar from "@/components/contentLayout/LikeCmtBar";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";

import { useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";

import { Grid } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import CommentSection from "../../../../components/contentLayout/CommentSection";

type ContentlayoutProps = {};

const UserContentDetail: React.FC<ContentlayoutProps> = () => {
  const { slug }: { slug: string } = useParams();
  const { data: contentData, mutate: contentMutate } = useGetContentBySlug<ContentData>(slug);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Dialog open={openModal} onOpenChange={val => setOpenModal(val)}>
      <div className="fixed max-w-[400px]  w-full  top-0 z-[9999] mx-auto flex flex-wrap">
        <ContentDetailHeader pathname="/home" title="Detail Page" />
      </div>
      <Grid columns="1">
        {contentData && (
          <div className="w-full h-full pt-[48px] pb-[100px]">
            {" "}
            <div className="w-full mx-auto h-[40vh] relative p-2">
              <div
                className="relative w-full max-w-[400px] rounded-lg h-full"
                style={{
                  background: `url(${contentData.data.image_url}) center / cover`,
                }}
              >
                {contentData.type !== "video" && (
                  <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg uppercase">
                    {contentData.data.type}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-full px-[16px] bg-white">
              <div className="w-full h-full">
                <h1 className="font-[700] text-[24px]">{contentData.data.title}</h1>
                <div className="h-full min-h-[50%] flex flex-col flex-wrap gap-y-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contentData.data.description,
                    }}
                  />
                  {contentData.data.content_article && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: contentData.data.content_article.article_body,
                      }}
                    />
                  )}
                  {contentData.data.content_opportunity && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: contentData.data.content_opportunity.body,
                      }}
                    />
                  )}
                  {contentData.data.content_event && (
                    <div className="flex flex-wrap gap-x-2 items-center text-[16px] font-[700]">
                      <Icons.location className="w-[20px] h-[20px]" />
                      {contentData.data.content_event.location}
                    </div>
                  )}
                  {contentData.data.content_event && (
                    <div className="flex flex-wrap gap-x-2 items-center  text-[16px] font-[700]">
                      <Icons.calender className="w-[20px] h-[20px]" />
                      {dayjs(contentData.data.content_event.to_datetime).format("D MMMM")}
                    </div>
                  )}
                  {contentData.data.content_opportunity && (
                    <div className="flex flex-wrap gap-x-2 items-center text-[16px] font-[700]">
                      <Icons.location className="w-[20px] h-[20px]" />
                      {contentData.data.content_opportunity.location || "Yangon"}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full fixed bottom-0 max-w-[400px] px-2">
              <LikeCmtBar data={contentData.data} mutate={contentMutate} />
            </div>
          </div>
        )}
        {openModal && (
          <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
            <CommentSection data={contentData} mutateParentData={contentMutate} />
          </DialogContent>
        )}
      </Grid>
    </Dialog>
  );
};

export default UserContentDetail;
