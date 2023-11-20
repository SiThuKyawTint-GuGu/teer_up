"use client";
import { Animate, Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useContentWatchCount, usePostPathwayProgress, useUnfinishPathway } from "@/services/content";
import { ContentData } from "@/types/Content";
import { getLocalStorage, setLocalStorage } from "@/utils";
import { getToken, getUserInfo } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Flex } from "@radix-ui/themes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentLayout from "./ContentLayout";
import Video from "./Video";
type PathwayDetailProp = {
  data: ContentData;
  contentMutate: any;
};
const user = getUserInfo();
const PathwayDetail: React.FC<PathwayDetailProp> = ({ data, contentMutate }) => {
  const [videos, setVideos] = useState<any>([]);
  const [showPathTitle, setShowPathTitle] = useState<boolean>(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTimeInView, setTotalTimeInView] = useState<number>(0);
  const { trigger: calculateCount } = useContentWatchCount();
  const { trigger: postPathwayProgress } = usePostPathwayProgress();
  const { data: pathwayProgress } = useUnfinishPathway(data.id);
  const token = getToken();
  useEffect(() => {
    if (data.content_pathways && data.content_pathways.length > 0 && pathwayProgress) {
      const index = Math.floor((pathwayProgress.progress * data.content_pathways.length - 1) / 100);

      // const current_content = data.content_pathways?.find(
      //   (each: ContentData) => parseInt(each.id) === pathwayProgress.current_content_id
      // );
      if (index) {
        const targetElement = document.getElementById(index.toString());
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    }
  }, [pathwayProgress, data.content_pathways]);

  const dataWithTitle = useMemo(() => {
    if (data && data.content_pathways && data.content_pathways.length > 0)
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

  function calculatePercentage(array: any[], index: number) {
    const percentage = (index / (array.length - 1)) * 100;
    return Math.floor(percentage);
  }

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      const handleScroll = () => {
        const scrollPosition = container.scrollTop;
        const newIndex = Math.round(scrollPosition / (window.innerHeight - 92));
        setStartTime(Date.now());
        setVisibleItemIndex(newIndex);
        if (newIndex !== visibleItemIndex) {
          // Calculate time in view when the item changes
          if (startTime !== null) {
            const endTime = Date.now();
            const timeInMilliseconds = endTime - startTime;
            setTotalTimeInView((totalTimeInView + timeInMilliseconds) / 1000);
            if (data && data.content_pathways && data.content_pathways.length > 0) {
              if (user && token) {
                postPathwayProgress({
                  id: data.id,
                  current_content_id:
                    data?.content_pathways[newIndex]?.type !== "html" ? data.content_pathways[newIndex]?.id : null,
                  progress: calculatePercentage(data.content_pathways, newIndex),
                });
              }
              if (user && data?.content_pathways[visibleItemIndex]?.type !== "html") {
                calculateCount({
                  watched_time: totalTimeInView,
                  content_id: data.content_pathways[visibleItemIndex].id,
                });
              }
            }
          }
        }
      };

      container.addEventListener("scroll", handleScroll);
      return () => {
        setTotalTimeInView(0);
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [visibleItemIndex, calculateCount, postPathwayProgress, totalTimeInView, data, startTime, token]);

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

    if (data.type === "html" && data.html_body)
      return (
        <div id={data.slug} className="w-full h-[95%] overflow-y-scroll rounded-lg px-2 bg-white shadow-lg">
          <div className="p-2 w-full h-full">
            <div
              className="text-start"
              dangerouslySetInnerHTML={{
                __html: data?.html_body,
              }}
            />
          </div>
        </div>
      );
    if ((data && data.content_article) || data.content_event || data.content_opportunity) {
      return <ContentLayout data={data} contentMutate={contentMutate} />;
    }
    return <div className="w-full  h-[95%] justify-center items-center">Data must be null</div>;
  };

  const storeIndex = (index: number) => {
    setLocalStorage("pathwayPosition", index);
  };

  useEffect(() => {
    const storeContentIndex = getLocalStorage("contentPosition");
    const targetElement = document.getElementById(`${storeContentIndex}`);
    if (targetElement) {
      targetElement.scrollIntoView({});
    }
  }, []);
  return (
    <Dialog>
      <div
        onClick={() => setShowPathTitle(false)}
        ref={containerRef}
        className={`snap-y flex-col snap-mandatory h-[calc(100dvh-96px)] px-2   w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
        style={{ scrollSnapStop: "always" }}
      >
        {data?.content_pathways &&
          data?.content_pathways.length > 0 &&
          data?.content_pathways.map((data, index) => (
            <div
              className="w-full h-full px-2 snap-start"
              style={{ scrollSnapStop: "always" }}
              id={index.toString()}
              key={index}
              onClick={() => storeIndex(index)}
            >
              <Box className="w-full h-full">{data && differentContent(data, index)}</Box>
            </div>
          ))}
      </div>

      <div
        className={`max-w-[400px] pathwayBottomNav mx-auto py-3  w-full flex flex-column fixed  bottom-0  rounded-lg px-2 flex-wrap  bg-white `}
      >
        <DialogTrigger asChild>
          <div className="w-full h-full relative ">
            <Flex justify="between" className="w-full">
              <Flex direction="column">
                <div className="font-[600] text-[16px]">{data?.title}</div>
                <div className="text-[14px] font-[300]">
                  Completed {data?.content_pathways && calculatePercentage(data.content_pathways, visibleItemIndex)}%
                </div>
              </Flex>

              <Icons.upArrow className="text-primary w-[20px] cursor-pointer h-[20px] absolute top-0 right-0" />
            </Flex>
          </div>
        </DialogTrigger>
        <DialogContent
          animate={Animate.SLIDE}
          className={cn(
            " top-[initial] bottom-0 px-0 py-2 translate-y-0 border-0 bg-white shadow-none outline-none rounded-16px-tl-tr"
          )}
        >
          <div
            className={`max-w-[400px]  mx-auto  left-0 w-full flex flex-column  bottom-0   overflow-y-scroll rounded-lg 
           
             px-2 flex-wrap  `}
          >
            <div className="w-full max-w-[400px] fixed bg-white">
              <div className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto" />
              <Flex justify="between" className="relative w-full mt-[16px] px-4">
                <Flex direction="column" className="w-full">
                  <Flex justify="between" align="center" className="w-full">
                    <Text className="font-[600] text-[16px]">{data?.title}</Text>
                    <Icons.downArrow className="text-primary w-[20px] cursor-pointer h-[20px]  " />
                  </Flex>

                  <Text className="text-[14px] font-[300]">
                    Completed {data?.content_pathways && calculatePercentage(data.content_pathways, visibleItemIndex)}%
                  </Text>
                </Flex>
              </Flex>
            </div>

            <div className=" pt-[70px] px-4 w-full h-[60dvh]">
              {data?.content_pathways &&
                data?.content_pathways.length > 0 &&
                data.content_pathways.map((data, index) => (
                  <div key={index} className="font-[600]  flex flex-col w-full text-[16px]  py-[12px]">
                    <Flex justify="between" align="center" className="w-full cursor-pointer">
                      <Text
                        className={` ${visibleItemIndex === index && "text-primary w-[calc(100%-40px)]"}`}
                        onClick={() => {
                          setShowPathTitle(false);
                          const targetElement = document.getElementById(index.toString());
                          if (targetElement) {
                            targetElement.scrollIntoView({
                              behavior: "smooth", // Smooth scroll effect
                            });
                          }
                        }}
                      >
                        {data.title || "--------"}
                      </Text>

                      <Icons.checkMark
                        className={`  ${
                          visibleItemIndex === index ? "text-primary w-[20px] h-[20px] text-[20px]" : "hidden"
                        }`}
                      />
                    </Flex>
                    <hr className="w-full h-[2px] mt-[12px] bg-slateGray" />
                  </div>
                ))}
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PathwayDetail;
