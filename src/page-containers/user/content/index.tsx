"use client";
import { ContentData } from "@/types/Content";

import { useContentWatchCount } from "@/services/content";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

import Loading from "@/app/loading";
import fetcher from "@/lib/fetcher";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils";
import { getUserInfo } from "@/utils/auth";
import { LinearProgress } from "@mui/material";
import { Box } from "@radix-ui/themes";
import ContentLayout from "./components/ContentLayout";
import Video from "./components/Video";
const UserContent = () => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);
  const user = getUserInfo();

  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTimeInView, setTotalTimeInView] = useState<number>(0);
  const { trigger: calculateCount } = useContentWatchCount();
  const [showContentLoading, setShowContentLoading] = useState<boolean>(false);

  useEffect(() => {});

  // restore scroll position
  useEffect(() => {
    if ("scrollPosition" in sessionStorage) {
      window.scrollTo(0, Number(sessionStorage.getItem("scrollPosition")));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  const {
    data: mmlData,
    mutate,
    isLoading,
    setSize,
  } = useSWRInfinite(index => `/content?page=${index + 1}&pagesize=${20}`, fetcher, {
    revalidateFirstPage: false,
    revalidateAll: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    parallel: false,
  });
  const issues: any = mmlData ? [].concat(...mmlData) : [];

  const contentDataArray: any = useMemo(() => issues?.flatMap((page: any) => page?.data) || [], [issues]);

  useEffect(() => {
    if (visibleItemIndex >= 1) {
      setSize(s => {
        if (visibleItemIndex === s * 20 - 5) {
          return s + 1;
        }
        return s;
      });
    }
  }, [visibleItemIndex, setSize]);
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleScroll = () => {
        const scrollPosition = container.scrollTop;
        const newIndex = Math.round(scrollPosition / (window.innerHeight - 92));
        setStartTime(Date.now());
        setVisibleItemIndex(newIndex);
        // if (container.scrollHeight - scrollPosition - container.clientHeight === 0) {
        //   setSize(s => s + 1);
        // }

        // setSize(s => {
        //   if (newIndex === s * 20 - 5) {
        //     return s + 1;
        //   }
        //   return s;
        // });
        if (contentDataArray && contentDataArray.length > 0) {
          if (newIndex === contentDataArray.length - 1) {
            setShowContentLoading(true);
          }
          setShowContentLoading(false);
        }

        if (newIndex !== visibleItemIndex) {
          if (user && contentDataArray && contentDataArray.length > 0) {
            if (startTime !== null) {
              const endTime = Date.now();
              const timeInMilliseconds = endTime - startTime;
              const totalTime = Math.floor((totalTimeInView + timeInMilliseconds) / 1000);
              if (contentDataArray && contentDataArray.length > 0) {
                calculateCount({
                  watched_time: totalTime,
                  content_id: contentDataArray[visibleItemIndex].id,
                });
              }

              return;
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
  }, [visibleItemIndex, startTime, calculateCount, contentDataArray, totalTimeInView, user]);

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
    if (data?.type === "video" && data.content_video)
      return <Video data={data} setVideoRef={handleVideoRef(index)} autoplay={true} contentMutate={mutate} />;
    return <ContentLayout data={data} contentMutate={mutate} />;
  };

  const storeIndex = (index: number) => {
    setLocalStorage("contentPosition", index);
  };

  useEffect(() => {
    const storeContentIndex = getLocalStorage("contentPosition");
    const targetElement = document.getElementById(`${storeContentIndex}`);
    if (targetElement) {
      targetElement.scrollIntoView({});
      removeLocalStorage("contentPosition");
    }
  }, []);
  // bg-transparent
  return (
    <div className="w-full h-[calc(100dvh-96px)]">
      {!isLoading ? (
        <Box
          ref={containerRef}
          className={`snap-y flex-col snap-mandatory h-full px-2 w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
          style={{ scrollSnapStop: "always" }}
          id="explore-list-container"
        >
          {contentDataArray &&
            contentDataArray.length > 0 &&
            contentDataArray.map((data: ContentData, index: number) => (
              <Box
                className="w-full h-full snap-start"
                style={{ scrollSnapStop: "always" }}
                id={index.toString()}
                key={index}
              >
                <Box className="w-full h-full " onClick={() => storeIndex(index)}>
                  {data && differentContent(data, visibleItemIndex)}

                  {showContentLoading && <LinearProgress color="error" />}
                </Box>
              </Box>
            ))}
        </Box>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserContent;
