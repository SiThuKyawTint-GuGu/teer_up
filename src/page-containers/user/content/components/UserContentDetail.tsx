"use client";

import Loading from "@/app/loading";
import ContentDetailHeader from "@/components/contentLayout/ContentDetailHeader";

import { useContentWatchCount, useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";

import { Flex, Grid } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
import NormalContentDetail from "./ContentDetail";
import MentorDetail from "./MentorDetail";
import PathwayDetail from "./PathwayDetail";
import VideoDetail from "./VideoDetail";
type ContentLayoutProps = {};

const UserContentDetail: React.FC<ContentLayoutProps> = () => {
  const { slug }: { slug: string } = useParams();
  const { data, mutate: contentMutate, isLoading } = useGetContentBySlug<ContentData>(slug);
  const { trigger: updateWatchCount } = useContentWatchCount();

  const contentData: ContentData = useMemo(() => data?.data, [data]);

  // Ref to store the start time
  const startTimeRef = useRef<number | null>(null);

  // Calculate and update the watch time
  const calculateAndUpdateWatchTime = () => {
    if (startTimeRef.current && contentData?.id) {
      const endTime = Date.now();
      const watchTime = Math.round((endTime - startTimeRef.current) / 1000); // Watch time in seconds
      updateWatchCount({
        watched_time: watchTime,
        content_id: contentData.id,
      });
      startTimeRef.current = null; // Reset the start time
    }
  };

  useEffect(() => {
    if (contentData?.id) {
      // Set the start time when the content is loaded
      startTimeRef.current = Date.now();
    }

    return () => {
      // Update watch time when the component is unmounted
      calculateAndUpdateWatchTime();
    };
  }, [contentData?.id]);

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
    <Grid columns="1" className="h-[100dvh] py-[48px]">
      {!isLoading ? (
        <>
          <div className="fixed max-w-[400px]  w-full  top-0  mx-auto flex flex-wrap z-10">
            <ContentDetailHeader title={`${contentData?.title}`} />
          </div>
          <div className="w-full h-full">
            <Flex justify="center" className="w-full h-full">
              {getContentDetail()}
            </Flex>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Grid>
  );
};

export default UserContentDetail;
