"use client";
import { Icons } from "@/components/ui/Images";
import { ContentData } from "@/types/Content";
import { Flex, Grid } from "@radix-ui/themes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentLayout from "./ContentLayout";
import Video from "./Video";

type PathwayDetailProp = {
  data: ContentData;
  contentMutate: any;
};
const PathwayDetail: React.FC<PathwayDetailProp> = ({ data, contentMutate }) => {
  const [videos, setVideos] = useState<any>([]);
  const [showPathTitle, setShowPathTitle] = useState<boolean>(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const dataWithTitle = useMemo(() => {
    if (data && data.content_pathways && data.content_pathways)
      return data.content_pathways.filter((each: ContentData) => each.title);
  }, [data]);

  console.log(dataWithTitle);

  console.log(dataWithTitle);
  useEffect(() => {
    setVideos(data);
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

  console.log("patwayDetail", data);
  const differentContent = (data: ContentData, index: number) => {
    console.log(data.type);
    if (data.type === "video" && data.content_video)
      return (
        <div className="w-full h-full" id={data.slug}>
          <Video data={data} setVideoRef={handleVideoRef(index)} autoplay={index === 0} contentMutate={contentMutate} />
        </div>
      );
    if (data.type === "event" && data.content_event)
      return (
        <div className="w-full h-full" id={data.slug}>
          <ContentLayout data={data} contentMutate={contentMutate} redir={`/content/${data.slug}`} />
        </div>
      );
    if (data.type === "article" && data.content_article)
      return (
        <div className="w-full h-full" id={data.slug}>
          <ContentLayout data={data} contentMutate={contentMutate} redir={`/content/${data.slug}`} />
        </div>
      );
    if (data.type === "opportunity" && data.content_opportunity)
      return (
        <div className="w-full h-full" id={data.slug}>
          <ContentLayout data={data} contentMutate={contentMutate} redir={`/content/${data.slug}`} />
        </div>
      );
    if (data.type === "html" && data.html_body)
      return (
        <div id={data.slug} className="w-full h-[90%] overflow-y-scroll rounded-lg px-2 bg-white shadow-lg">
          <div className="p-2">
            <div
              className="text-start"
              dangerouslySetInnerHTML={{
                __html: data?.html_body,
              }}
            />
          </div>
        </div>
      );
    return <div>This Page is not available right now</div>;
  };

  return (
    <Grid columns="1">
      <div className="snap-y flex-col snap-mandatory w-full h-[90vh]   bg-[#F8F9FB] no-scrollbar overflow-y-scroll">
        {data?.content_pathways &&
          data?.content_pathways.length > 0 &&
          data?.content_pathways.map((data, index) => (
            <div className="h-full w-full snap-start" key={index}>
              {differentContent(data, index)}
            </div>
          ))}
      </div>

      <div className="max-w-[400px] mx-auto py-3 w-full flex flex-column fixed bottom-0  p-3 flex-wrap  bg-white z-[99999]">
        <div className="w-full h-full relative">
          <Flex justify="between" className="w-full">
            <div className="font-[600] text-[16px]">{data?.title}</div>
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
              {dataWithTitle &&
                dataWithTitle.length > 0 &&
                dataWithTitle.map((data, index) => (
                  <div key={index} className="font-[600] flex flex-col w-full text-[16px] py-1">
                    <Flex justify="between" className="w-full py-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          const targetElement = document.getElementById(data.slug);
                          if (targetElement) {
                            targetElement.scrollIntoView({
                              behavior: "smooth", // Smooth scroll effect
                            });
                          }
                        }}
                      >
                        {data.title}
                      </div>
                      <Icons.checkMark className="w-[20px] h-[20px]" />
                    </Flex>
                    <hr className="w-full h-[2px] bg-slateGray" />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
};

export default PathwayDetail;
