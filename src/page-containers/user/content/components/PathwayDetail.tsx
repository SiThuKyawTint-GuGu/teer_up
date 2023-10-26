"use client";
import { Icons } from "@/components/ui/Images";
import { useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";
import { Flex, Grid } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ContentLayout from "./ContentLayout";
import Video from "./Video";

const PathwayDetail: React.FC = () => {
  const { slug }: { slug: string } = useParams();
  const { data: contentData, mutate: contentMutate } = useGetContentBySlug<ContentData>(slug);
  const [videos, setVideos] = useState<any>([]);
  const [showPathTitle, setShowPathTitle] = useState<boolean>(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  useEffect(() => {
    setVideos(contentData);
  }, []);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries: any[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach(videoRef => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);
  const handleVideoRef = (index: number) => (ref: HTMLVideoElement | null) => {
    if (ref) {
      videoRefs.current[index] = ref;
    }
  };
  const differentContent = (data: ContentData, index: number) => {
    console.log(data.type);
    if (data.type === "video" && data.content_video)
      return (
        <Video
          data={data}
          setVideoRef={handleVideoRef(index)}
          autoplay={index === 0}
          contentMutate={contentMutate}
        />
      );
    if (data.type === "event" && data.content_event)
      return (
        <ContentLayout data={data} contentMutate={contentMutate} redir={`/events/${data.slug}`} />
      );
    if (data.type === "article" && data.content_article)
      return (
        <ContentLayout data={data} contentMutate={contentMutate} redir={`/articles/${data.slug}`} />
      );
    if (data.type === "opportunity" && data.content_opportunity)
      return (
        <ContentLayout
          data={data}
          contentMutate={contentMutate}
          redir={`/opportunity/${data.slug}`}
        />
      );
    if (data.type === "pathway")
      return (
        <ContentLayout data={data} contentMutate={contentMutate} redir={`/pathway/${data.slug}`} />
      );
    return <div>This Page is not avaliable right now</div>;
  };

  const linkToDir = (data: ContentData) => {
    if (data.type === "event") return <Link href={`/events/${data.slug}`}>{data.title}</Link>;
    if (data.type === "article") return <Link href={`/articles/${data.slug}`}>{data.title}</Link>;
    if (data.type === "opportunity")
      return <Link href={`/opportunity/${data.slug}`}>{data.title}</Link>;
  };
  return (
    <Grid columns="1">
      <div className="w-full h-full">
        {contentData?.data.content_pathways && (
          <>
            {contentData.data.content_pathways.length > 0 && (
              <div className="snap-y flex-col snap-mandatory w-full h-[90vh] bg-[#F8F9FB] no-scrollbar overflow-y-scroll">
                {contentData.data.content_pathways.map((data: ContentData, index: number) => (
                  <div
                    key={index}
                    className="h-full  w-full flex justify-center  items-center snap-start"
                  >
                    <div>{differentContent(data, index)}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Flex
        justify="between"
        direction="column"
        className="absolute bottom-0 py-3 w-full h-auto p-3 flex-wrap left-0 bg-white z-[99999]"
      >
        <div className="w-full h-full relative" onClick={() => setShowPathTitle(!showPathTitle)}>
          <Flex justify="between" className="w-full">
            <div className="font-[600] text-[16px]">{contentData?.data?.title}</div>
            {!showPathTitle ? (
              <Icons.upArrow
                className="text-primary w-[20px] h-[20px] absolute top-0 right-0"
                onClick={() => setShowPathTitle(true)}
              />
            ) : (
              <Icons.downArrow
                className="text-primary w-[20px] h-[20px] absolute top-0 right-0"
                onClick={() => setShowPathTitle(false)}
              />
            )}
          </Flex>
          {showPathTitle && (
            <div className="py-5">
              {contentData?.data?.content_pathways.length > 0 &&
                contentData.data.content_pathways.map((data: ContentData, index: number) => (
                  <div key={index} className="font-[600]flex flex-col w-full text-[16px] py-1">
                    <Flex justify="between" className="w-full py-2">
                      <div>{linkToDir(data)}</div>
                      <Icons.checkMark className="w-[20px] h-[20px]" />
                    </Flex>
                    <hr className="w-full h-[2px] bg-slateGray" />
                  </div>
                ))}
            </div>
          )}
        </div>
      </Flex>
    </Grid>
  );
};

export default PathwayDetail;
