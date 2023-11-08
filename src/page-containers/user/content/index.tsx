"use client";
import { ContentData } from "@/types/Content";

import {
  ParamsType,
  useContentWatchCount,
  useGetContentInfinite,
  useGetOnboardingQuestions,
  useGetOnboardingStatus,
  useSkipOnboarding,
} from "@/services/content";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { getUserInfo } from "@/utils/auth";
import ContentLayout from "./components/ContentLayout";
import Onboarding from "./components/Onboarding";
import Video from "./components/Video";

const UserContent = () => {
  const [page, setPage] = useState<number>(1);
  const [onBoardPage, setOnboardPage] = useState<number>(1);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);
  const [onBoardingIndex, setOnBoardingIndex] = useState(0);
  const { data, mutate } = useGetContentInfinite<ParamsType>({
    page: page,
    pagesize: 25,
  });
  const user = getUserInfo();

  const { data: onboarding } = useGetOnboardingQuestions({
    page: onBoardPage,
    pagesize: 20,
  });

  const { trigger: skipOnboarding } = useSkipOnboarding();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTimeInView, setTotalTimeInView] = useState<number>(0);
  const { trigger: calculateCount } = useContentWatchCount();
  const { data: status } = useGetOnboardingStatus();
  const contentDataArray: ContentData[] = useMemo(() => data?.flatMap(page => page?.data) || [], [data]);
  const onBoardArray: ContentData[] = onboarding?.data;
  const skip = status?.data.skip;

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
          if (contentDataArray && contentDataArray.length > 0) {
            if (user && contentDataArray[visibleItemIndex].type !== "onboarding") {
              if (startTime !== null) {
                const endTime = Date.now();
                const timeInMilliseconds = endTime - startTime;
                let totalTime = Math.floor((totalTimeInView + timeInMilliseconds) / 1000);
                console.log(totalTime);
                // if (totalTime > 30) {
                //   contentDataArray.splice(visibleItemIndex + 1, 0, onBoardArray[onBoardingIndex]);
                //   setOnBoardingIndex(prev => prev + 1);
                // }
                setTotalTimeInView(totalTime);
                calculateCount({
                  watched_time: totalTimeInView,
                  content_id: contentDataArray[visibleItemIndex].id,
                });
                return;
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
  }, [visibleItemIndex]);

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
  }, []);

  const handleVideoRef = (index: number) => (ref: HTMLVideoElement | null) => {
    if (ref) {
      videoRefs.current[index] = ref;
    }
  };

  const differentContent = (data: ContentData, index: number) => {
    if (data.type === "video" && data.content_video)
      return <Video data={data} setVideoRef={handleVideoRef(index)} autoplay={index === 0} contentMutate={mutate} />;
    if (data.type === "onboarding") return <Onboarding data={data} parentIndex={index.toString()} />;
    return <ContentLayout data={data} contentMutate={mutate} />;
  };

  return (
    <>
      <div className="w-full h-[calc(100vh-92px)] pt-[32px]">
        <div
          ref={containerRef}
          className={`snap-y flex-col snap-mandatory h-full px-2   w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
          style={{ scrollSnapStop: "always" }}
        >
          {contentDataArray &&
            contentDataArray.length > 0 &&
            contentDataArray.map((data: ContentData, index) => (
              <div
                className="w-full h-full pt-2 snap-start"
                style={{ scrollSnapStop: "always" }}
                id={index.toString()}
                key={index}
              >
                {differentContent(data, index)}

                {index == 0 && <div className="py-4 text-center font-[300]">Swipe up for more</div>}
                {contentDataArray &&
                  contentDataArray.length > 0 &&
                  contentDataArray[visibleItemIndex].type === "onboarding" && (
                    <Button
                      variant="link"
                      className="text-center w-full py-4 text-primary"
                      onClick={() => {
                        skipOnboarding(
                          {
                            skip: true,
                          },
                          {
                            onSuccess: () => {
                              mutate();
                            },
                          }
                        );
                      }}
                    >
                      {!skip && "Skip"}
                    </Button>
                  )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserContent;
