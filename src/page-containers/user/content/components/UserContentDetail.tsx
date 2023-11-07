"use client";

import Loading from "@/app/loading";
import CommentSection from "@/components/contentLayout/CommentSection";
import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";
import { Dialog, DialogContent } from "@/components/ui/Dialog";

import { useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";

import { Grid } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import NormalContentDetail from "./ContentDetail";
import MentorDetail from "./MentorDetail";
import PathwayDetail from "./PathwayDetail";
import VideoDetail from "./VideoDetail";
type ContentlayoutProps = {};

const UserContentDetail: React.FC<ContentlayoutProps> = () => {
  const { slug }: { slug: string } = useParams();
  const { data, mutate: contentMutate, isLoading } = useGetContentBySlug<ContentData>(slug);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const contentData: ContentData = useMemo(() => data?.data, [data]);

  const getContentDetail = () => {
    if (contentData?.type === "article" || contentData?.type === "event" || contentData?.type === "opportunity")
      return <NormalContentDetail data={contentData} contentMutate={contentMutate} />;
    if (contentData?.type === "video") return <VideoDetail data={contentData} contentMutate={contentMutate} />;
    if (contentData?.type === "pathway") return <PathwayDetail data={contentData} contentMutate={contentMutate} />;
    if (contentData?.type === "mentor") return <MentorDetail data={contentData} contentMutate={contentMutate} />;
  };
  return (
    <Grid columns="1">
      {!isLoading ? (
        <Dialog open={openModal} onOpenChange={val => setOpenModal(val)}>
          <div className="fixed max-w-[400px]  w-full  top-0  mx-auto flex flex-wrap">
            <ContentDetailHeader title={`${contentData?.type} detail`} />
          </div>
          <div className="w-full h-screen py-[46px]">
            <div className="w-full h-full">{getContentDetail()}</div>
          </div>

          {openModal && (
            <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
              <CommentSection data={contentData} mutateParentData={contentMutate} />
            </DialogContent>
          )}
        </Dialog>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};

export default UserContentDetail;
