"use client";
import { useGetContentBySlug } from "@/services/content";
import { ContentData } from "@/types/Content";
import { Grid } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Article from "./Article";
import Event from "./Event";
import Opportunity from "./Opportunity";
import Pathway from "./Pathway";
import Video from "./Video";

const PathwayDetail: React.FC = () => {
  const { slug }: { slug: string } = useParams();
  const { data: contentData, mutate: contentMutate } = useGetContentBySlug<ContentData>(slug);
  const [videos, setVideos] = useState<any>([]);
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
      return <Event data={data} contentMutate={contentMutate} />;
    if (data.type === "article" && data.content_article)
      return <Article data={data} contentMutate={contentMutate} />;
    if (data.type === "opportunity" && data.content_opportunity)
      return <Opportunity data={data} contentMutate={contentMutate} />;
    if (data.type === "pathway") return <Pathway data={data} contentMutate={contentMutate} />;
    return <div>This Page is not avaliable right now</div>;
  };
  return (
    <Grid columns="1">
      <div>
        {contentData?.data.content_pathways && (
          <>
            {contentData.data.content_pathways.length > 0 && (
              <div className="snap-y flex-col snap-mandatory w-full max-h-[750px] h-[85vh] no-scrollbar overflow-y-scroll">
                {contentData.data.content_pathways.map((data: ContentData, index: number) => (
                  <div
                    key={index}
                    className="h-full w-full flex justify-center  items-center snap-start"
                  >
                    {differentContent(data, index)}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Grid>
  );
};

export default PathwayDetail;
