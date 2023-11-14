"use client";

import ReactionBar from "@/components/contentLayout/ReactionBar";
import CardBox from "@/components/ui/Card";
import { Text } from "@/components/ui/Typo/Text";
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
  const [comments, setComments] = useState<number>(0);

  useEffect(() => {
    setComments(data.comments);
  }, [data.comments]);

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
      <div className="w-full h-full  rounded-t-[8px] relative text-white" onClick={() => showCmt && setShowCmt(false)}>
        {data.content_video && (
          <div className="video-wrapper  " onClick={onVideoPress}>
            <video
              poster={data.image_url}
              preload="none"
              data-video="0"
              loop
              ref={ref => {
                videoRef.current = ref;
                setVideoRef(ref);
              }}
              muted={isSafari}
              controls={false}
              playsInline={true}
              className={`w-full h-full object-scale-down absolute bg-black videos`}
            >
              <source
                className={`object-cover bg-cover bg-center`}
                src={data.content_video.video_url}
                type="video/mp4"
              ></source>
            </video>
          </div>
        )}

        <div
          className={`absolute flex flex-col items-baseline cursor-pointer w-full bottom-0 px-3 py-3 z-[1] text-[14px] font-[600] ${
            showDescription &&
            "max-h-[50%] h-auto bg-[rgba(0,0,0,.5)] overflow-y-scroll no-scrollbar text-start items-end justify-start"
          }`}
        >
          {!showDescription && (
            <div
              className="h-full w-full"
              onClick={() => {
                if (data.description.length > 50) {
                  setShowDescription(true);
                }
              }}
            >
              <div className="mb-3">{data.title}</div>
              <div>
                {data.description.length > 50 ? (
                  <div>
                    {data.description.slice(0, 50)}...
                    <Text as="span" className="text-primary">
                      see more
                    </Text>
                  </div>
                ) : (
                  <Text>data.description</Text>
                )}
              </div>
            </div>
          )}
          {showDescription && data.description.length > 50 && (
            <div onClick={() => setShowDescription(false)}>
              <div className="mb-3">{data.title}</div>
              <div>{data.description}</div>
            </div>
          )}
        </div>
      </div>

      <CardBox className="px-[12px]">
        <ReactionBar data={data} contentMutate={contentMutate} comments={comments} setComments={setComments} />
      </CardBox>
    </div>
  );
};

export default Video;
