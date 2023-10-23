"use client";
import { ParamsType } from "@/services/user";
import { ContentData, ContentType } from "@/types/Content";
import InfiniteScroll from "react-infinite-scroll-component";

import Event from "@/page-containers/user/content/components/Event";
import Video from "@/page-containers/user/content/components/Video";
import { useGetContent } from "@/services/content";
import { useEffect, useRef, useState } from "react";
import Article from "./components/Article";
import Opportunity from "./components/Opportunity";
import Pathway from "./components/Pathway";

const UserContent = () => {
  const [page, setPage] = useState<number>(1);
  const [videos, setVideos] = useState<any>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const { data: contentData, mutate } = useGetContent<ParamsType, ContentType>({
    page: page,
    pageSize: 20,
  });

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
          contentMutate={mutate}
        />
      );
    if (data.type === "event" && data.content_event)
      return <Event data={data} contentMutate={mutate} />;
    if (data.type === "article" && data.content_article)
      return <Article data={data} contentMutate={mutate} />;
    if (data.type === "opportunity" && data.content_opportunity)
      return <Opportunity data={data} contentMutate={mutate} />;
    if (data.type === "pathway") return <Pathway data={data} contentMutate={mutate} />;
    return <div>This Page is not avaliable right now</div>;
  };

  const hasMoreData = (contentData: ContentType) => {
    return contentData.total > contentData.current_page * contentData.per_page;
  };
  mutate();
  return (
    <>
      {contentData && (
        <InfiniteScroll
          dataLength={contentData.data.length}
          next={() => setPage(prev => prev + 1)}
          hasMore={hasMoreData(contentData)}
          loader={<p></p>}
        >
          <div className="snap-y flex-col snap-mandatory w-full max-h-[750px] h-[85vh]   no-scrollbar overflow-y-scroll">
            {contentData.data.map((data: ContentData, index: number) => (
              <div
                className="h-full w-full flex justify-center  items-center snap-start"
                key={index}
              >
                {differentContent(data, index)}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default UserContent;
