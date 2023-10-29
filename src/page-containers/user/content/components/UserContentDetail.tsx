"use client";

import LikeCmtBar from "@/components/contentLayout/LikeCmtBar";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";

import { useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";

import { Grid } from "@radix-ui/themes";
import dayjs from "dayjs";
import Image from "next/image";
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
      <Grid columns="1">
        {contentData && (
          <div className="w-full h-full">
            {" "}
            <div className="w-full mx-auto relative p-2">
              <Image
                src={contentData.data.image_url}
                className="w-full h-[30%]"
                width={358}
                height={200}
                alt={contentData.data.title}
              />
              <div className="absolute capitalize top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] rounded-bl-lg shadow-lg">
                {contentData.data.type}
              </div>
            </div>
            <div className="w-full px-[16px] bg-white">
              <div>
                <h1 className="font-[700] text-[24px]">{contentData.data.title}</h1>

                <div className="h-full min-h-[50vh] flex flex-col flex-wrap gap-y-3">
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
            <div className="w-full">
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
