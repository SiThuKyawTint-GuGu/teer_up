"use client";

import Loading from "@/app/loading";
import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";

import { useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";

import { Grid } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import NormalContentDetail from "./ContentDetail";
import MentorDetail from "./MentorDetail";
import PathwayDetail from "./PathwayDetail";
import VideoDetail from "./VideoDetail";
type ContentLayoutProps = {};

const UserContentDetail: React.FC<ContentLayoutProps> = () => {
  const { slug }: { slug: string } = useParams();
  const { data, mutate: contentMutate, isLoading } = useGetContentBySlug<ContentData>(slug);

  const contentData: ContentData = useMemo(() => data?.data, [data]);

  const getContentDetail = () => {
    if (
      (contentData && contentData?.type === "article") ||
      contentData?.type === "event" ||
      contentData?.type === "opportunity"
    )
      return <NormalContentDetail data={contentData} contentMutate={contentMutate} />;
    if (contentData && contentData?.type === "video")
      return <VideoDetail data={contentData} contentMutate={contentMutate} />;
    if (contentData && contentData?.type === "pathway")
      return <PathwayDetail data={contentData} contentMutate={contentMutate} />;
    if (contentData && contentData?.type === "mentor")
      return <MentorDetail data={contentData} contentMutate={contentMutate} />;
  };

  return (
    <Grid columns="1">
      {!isLoading ? (
        <>
          <div className="fixed max-w-[400px]  w-full  top-0  mx-auto flex flex-wrap z-10">
            <ContentDetailHeader title={`${contentData?.title}`} />
          </div>
          <div className="w-full h-[100dvh-96px] flex justify-center items-center">
            <div className="w-full h-full">{getContentDetail()}</div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};

export default UserContentDetail;
