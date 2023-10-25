"use client";
import { ParamsType } from "@/services/user";
import { ContentData, ContentType } from "@/types/Content";

import Loading from "@/app/loading";
import Video from "@/page-containers/user/content/components/Video";
import { useGetContentInfinite } from "@/services/content";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLayout from "./components/ContentLayout";
import Onboarding from "./components/Onboarding";

const UserContent = () => {
  const [page, setPage] = useState<number>(1);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const { data, mutate, isLoading } = useGetContentInfinite<ParamsType>({
    page: page,
    pageSize: 20,
  });

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
      return (
        <Video
          data={data}
          setVideoRef={handleVideoRef(index)}
          autoplay={index === 0}
          contentMutate={mutate}
        />
      );
    if (data.type === "event" && data.content_event)
      return <ContentLayout data={data} contentMutate={mutate} redir={`/events/${data.slug}`} />;
    if (data.type === "article" && data.content_article)
      return <ContentLayout data={data} contentMutate={mutate} redir={`/events/${data.slug}`} />;
    if (data.type === "opportunity" && data.content_opportunity)
      return <ContentLayout data={data} contentMutate={mutate} redir={`/events/${data.slug}`} />;
    if (data.type === "pathway")
      return <ContentLayout data={data} contentMutate={mutate} redir={`/events/${data.slug}`} />;
    if (data.type === "onboarding") return <Onboarding data={data} />;
    return <div>This Page is not avaliable right now</div>;
  };

  const hasMoreData = (contentData: ContentType) => {
    return contentData.total > contentData.current_page * contentData.per_page;
  };
  mutate();
  return (
    <>
      {isLoading ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : (
        <div>
          {data &&
            data.length > 0 &&
            data.map((data: ContentType, index: number) => (
              <div key={index}>
                {data && data.data.length > 0 && (
                  <InfiniteScroll
                    dataLength={data.data.length}
                    next={() => setPage(prev => prev + 1)}
                    hasMore={hasMoreData(data)}
                    loader={<p></p>}
                  >
                    <div className="snap-y flex-col snap-mandatory w-full h-[90vh] bg-[#F8F9FB] no-scrollbar overflow-y-scroll">
                      {data.data.map((data: ContentData, index: number) => (
                        <div
                          className="h-full  w-full flex justify-center  items-center snap-start"
                          key={index}
                        >
                          {differentContent(data, index)}
                        </div>
                      ))}
                    </div>
                  </InfiniteScroll>
                )}
              </div>
            ))}
        </div>
      )}
      <div></div>
    </>
  );
};

export default UserContent;
