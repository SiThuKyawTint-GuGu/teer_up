"use client";

import ReactionBar from "@/components/contentLayout/ReactionBar";
import CardBox from "@/components/ui/Card";
import { ContentData } from "@/types/Content";

import { useEffect, useMemo, useRef, useState } from "react";
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
      // Autoplay is triggered when the component mounts
      videoRef.current.play().catch(error => {
        // Handle the play() promise rejection
        console.error("Error playing the video:", error);
      });
    }
  }, [autoplay]);

  const onPlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Handle the play() promise rejection
        console.error("Error playing the video:", error);
      });
    }
  };

  // Intersection Observer setup
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        // Video is in view, play it
        videoRef.current?.play().catch(error => {
          // Handle the play() promise rejection
          console.error("Error playing the video:", error);
        });
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
        videoRef.current.play().catch(error => {
          // Handle the play() promise rejection
          console.error("Error playing the video:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };
  const isSafari = useMemo(() => {
    return (
      // @ts-ignore
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
        // @ts-ignore
      })(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification))
    );
  }, []);

  return (
    <div className="w-full h-[100%] flex flex-col">
      <div
        className="w-full h-full overflow-y-auto rounded-t-[8px] relative text-white"
        onClick={() => showCmt && setShowCmt(false)}
      >
        {data.content_video && (
          <video
            poster={data.image_url}
            preload="none"
            data-video="0"
            loop
            onClick={onVideoPress}
            ref={ref => {
              videoRef.current = ref;
              setVideoRef(ref);
            }}
            muted={isSafari}
            playsInline={true}
            className={`w-full h-full object-scale-down absolute bg-black`}
          >
            <source
              className={`object-cover bg-cover bg-center`}
              src={data.content_video.video_url}
              type="video/mp4"
            ></source>
          </video>
        )}

        <div
          className={`absolute flex flex-col items-baseline cursor-pointer w-full bottom-0 px-3 py-3 z-[1] text-[14px] font-[600] ${
            showDescription &&
            "h-full bg-[rgba(0,0,0,.5)] overflow-scroll no-scrollbar text-start items-end justify-end"
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

      <CardBox className="px-[12px]">
        <ReactionBar data={data} contentMutate={contentMutate} />
      </CardBox>
    </div>
  );
};

export default Video;
