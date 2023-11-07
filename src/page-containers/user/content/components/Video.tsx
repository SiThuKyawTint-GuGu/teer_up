"use client";

import CardBox from "@/components/ui/Card";
import ReactionBar from "@/page-containers/admin/content/ReactionBar";
import { ContentData } from "@/types/Content";

import { useEffect, useRef, useState } from "react";
type VideoProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
  contentMutate: any;
  index?: number;
};
const Video: React.FC<VideoProps> = ({ data, setVideoRef, autoplay, contentMutate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showCmt, setShowCmt] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }
  }, [autoplay]);

  // Intersection Observer setup
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        // Video is in view, play it
        videoRef.current?.play();
      } else {
        // Video is not in view, pause it
        videoRef.current?.pause();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="w-full h-[90%] flex flex-col">
      <div
        className="w-full h-full overflow-y-auto  md:aspect-video relative text-white"
        onClick={() => showCmt && setShowCmt(false)}
      >
        {data.content_video && (
          <video
            poster={data.image_url}
            preload="none"
            data-video="0"
            loop
            muted={false}
            onClick={onVideoPress}
            ref={ref => {
              videoRef.current = ref;
              setVideoRef(ref);
            }}
            playsInline={true}
            className={`w-full h-full object-cover absolute`}
          >
            <source
              className={`object-cover bg-cover bg-center`}
              src={data.content_video.video_url}
              type="video/mp4"
            ></source>
          </video>
        )}

        <div
          className={`absolute flex flex-col items-baseline cursor-pointer w-full bg-slate-700 opacity-[0.8]  bottom-0 px-3 py-3 z-[1] text-[20px] font-[600] ${
            showDescription && "transition-all duration-1000 ease-in-out"
          }`}
        >
          {!showDescription && (
            <div
              onClick={() => {
                if (data.description.length > 50) {
                  setShowDescription(true);
                }
              }}
            >
              <div>{data.title}</div>
              <div>
                {data.description.length > 50 ? data.description.slice(0, 50) + "...see more" : data.description}
              </div>
            </div>
          )}
          {showDescription && data.description.length > 50 && (
            <div onClick={() => setShowDescription(false)}>
              <div>{data.title}</div>
              <div>{data.description}</div>
            </div>
          )}
        </div>
      </div>
      <CardBox>
        <ReactionBar data={data} contentMutate={contentMutate} />
      </CardBox>
    </div>
  );
};

export default Video;
