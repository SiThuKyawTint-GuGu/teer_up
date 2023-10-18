"use client";

import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useLikeContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import { useEffect, useRef } from "react";

type VideoProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
};
const Video: React.FC<VideoProps> = ({ data, setVideoRef, autoplay }) => {
  const { trigger } = useLikeContent(data.id);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    <div className="w-full h-full md:aspect-video relative text-white">
      {data.content_video && (
        <video
          poster={
            data.content_video.thumbnail ||
            "https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg"
          }
          preload="none"
          data-video="0"
          loop
          muted={false}
          onClick={onVideoPress}
          ref={ref => {
            videoRef.current = ref;
            setVideoRef(ref);
          }}
          className={`w-full h-full object-fill absolute`}
        >
          <source
            className={`object-cover bg-cover bg-center`}
            src={data.content_video.video_url}
            type="video/mp4"
          ></source>
        </video>
      )}

      <div className="absolute flex flex-col items-baseline w-[300px] bottom-5 left-3 z-[1000] text-[20px] font-[600]">
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
      </div>
      <div className="absolute right-3 bottom-[1rem] items-end flex flex-col flex-wrap gap-y-[32px]">
        <div className="flex flex-col flex-wrap gap-[10px] w-full">
          <Icons.like
            className="w-[40px] h-[40px]"
            // className="filter drop-shadow-[0px 8px 4px rgba(0, 0, 0, 0.50)]"
          />
          <div className="text-[18px] font-[600] text-center">{data.likes}</div>
        </div>
        <div className="flex flex-col flex-wrap gap-[10px]">
          <Icons.comment className="w-[40px] h-[40px]" />
          <div className="text-[18px] font-[600] text-center">{data.comments}</div>
        </div>
        <div className="flex flex-col flex-wrap gap-[10px] ">
          <Icons.saved className="w-[40px] h-[40px]" />
          <div className="text-[18px] font-[600] text-center"></div>
        </div>
        <div>
          <Icons.share className="w-[40px] h-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default Video;
