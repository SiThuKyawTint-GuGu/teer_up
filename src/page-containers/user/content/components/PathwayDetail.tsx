"use client";
import { Icons } from "@/components/ui/Images";
import { ContentData } from "@/types/Content";
import { Flex } from "@radix-ui/themes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
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
  const { ref: contentRef, inView: contentVisible } = useInView();
  const [entry, setEntry] = useState<HTMLDivElement | null>(null);
  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dataWithTitle = useMemo(() => {
    if (data && data.content_pathways && data.content_pathways)
      return data.content_pathways.filter((each: ContentData) => each.title);
  }, [data]);
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

  console.log(entry?.id);

  function calculatePercentage(array: any[], index: number) {
    if (index < 0 || index >= array.length) {
      return "out of range";
    }

    const percentage = (index / (array.length - 1)) * 100;
    return Math.floor(percentage);
  }

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      const handleScroll = () => {
        const scrollPosition = container.scrollTop;
        const newIndex = Math.round(scrollPosition / (window.innerHeight - 96));
        setVisibleItemIndex(newIndex);
      };

      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  console.log("visible", visibleItemIndex);

  const differentContent = (data: ContentData, index: number) => {
    if (data.type === "video" && data.content_video)
      return (
        <Video
          data={data}
          index={index}
          setVideoRef={handleVideoRef(index)}
          autoplay={index === 0}
          contentMutate={contentMutate}
        />
      );
    if (data.type === "event" && data.content_event)
      return (
        <ContentLayout
          data={data}
          contentMutate={contentMutate}
          contentRef={contentRef}
          redir={`/content/${data.slug}`}
        />
      );
    if (data.type === "article" && data.content_article)
      return (
        <ContentLayout
          data={data}
          contentMutate={contentMutate}
          contentRef={contentRef}
          redir={`/content/${data.slug}`}
        />
      );
    if (data.type === "opportunity" && data.content_opportunity)
      return (
        <ContentLayout
          data={data}
          contentMutate={contentMutate}
          contentRef={contentRef}
          redir={`/content/${data.slug}`}
        />
      );
    if (data.type === "html" && data.html_body)
      return (
        <div
          id={data.slug}
          ref={contentRef}
          className="w-full h-[90%] overflow-y-scroll rounded-lg px-2 bg-white shadow-lg"
        >
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
    <>
      <div
        ref={containerRef}
        className={`snap-y flex-col snap-mandatory h-full px-2 pb-[46px] w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
      >
        {data?.content_pathways &&
          data?.content_pathways.length > 0 &&
          data?.content_pathways.map((data, index) => (
            <div className="w-full h-full snap-start" ref={contentRef} id={data.slug} key={index}>
              {differentContent(data, index)}
              {index == 0 && <div className="py-4 text-center font-[300]">Swipe up for more</div>}
            </div>
          ))}
      </div>

      <div className="max-w-[400px] mx-auto py-3 w-full flex flex-column fixed bottom-0  p-3 flex-wrap  bg-white z-[99999]">
        <div className="w-full h-full relative">
          <Flex justify="between" className="w-full">
            <Flex direction="column">
              <div className="font-[600] text-[16px]">{data?.title}</div>
              <div className="text-[14px] font-[300]">
                {data?.content_pathways && calculatePercentage(data.content_pathways, visibleItemIndex)}%
              </div>
            </Flex>

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
                  <div key={index} className="font-[600]  flex flex-col w-full text-[16px] py-1">
                    <Flex justify="between" className="w-full py-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setShowPathTitle(false);
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
                      {index === visibleItemIndex && <Icons.checkMark className="w-[20px] h-[20px]" />}
                    </Flex>
                    <hr className="w-full h-[2px] bg-slateGray" />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PathwayDetail;
