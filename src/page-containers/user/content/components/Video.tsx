"use client";

import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import CommentSection from "../../../../components/contentLayout/CommentSection";
type VideoProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
  contentMutate: any;
};
const Video: React.FC<VideoProps> = ({ data, setVideoRef, autoplay, contentMutate }) => {
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showCmt, setShowCmt] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [showDescription, setShowDescription] = useState<boolean>(false);

  const likePost = async () => {
    await like(
      { id: data.id },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };
  const saveContent = async () => {
    await contentSave(
      {
        id: data.id,
      },
      {
        onSuccess: () => contentMutate(),
      }
    );
  };
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
    <Dialog open={openModal} onOpenChange={val => setOpenModal(val)}>
      <div className="w-full h-full flex flex-col">
        <div
          className="w-full h-[90%]  md:aspect-video relative text-white"
          onClick={() => showCmt && setShowCmt(false)}
        >
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
            className={`absolute flex flex-col items-baseline w-[300px] cursor-pointer bottom-5 left-3 z-[1000] text-[20px] font-[600] ${
              showDescription && "transition-all duration-1000 ease-in-out"
            }`}
            onClick={() => setShowDescription(prev => !prev)}
          >
            <Text>{data.title}</Text>
            {!showDescription ? (
              <div className="flex flex-wrap gap-x-1">
                <div>
                  {(() => {
                    const temporaryDiv = document.createElement("div");

                    temporaryDiv.innerHTML = data.description && data.description.toString();
                    if (!temporaryDiv.textContent) return "";
                    return temporaryDiv.textContent.substring(0, 50) + "...";
                  })()}
                </div>
                <span>See more</span>
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between p-3 bg-white">
          <div className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
            {data.is_liked ? (
              <Icons.likefill className="w-[20px] h-[20px] text-primary" />
            ) : (
              <Icons.like className="w-[20px] h-[20px]" />
            )}
            <div>
              {""}
              {data.likes}
            </div>
          </div>
          {/* <DialogTrigger> */}
          <DialogTrigger>
            <div className="flex items-center flex-wrap gap-x-[10px]">
              <Icons.comment className="w-[20px] h-[20px]" />
              <div>
                {""}
                {data.comments}
              </div>
            </div>
          </DialogTrigger>
          {/* </DialogTrigger> */}
          <div className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
            {data.is_saved ? (
              <Icons.savedFill className="w-[20px] h-[20px] text-yellow-400" />
            ) : (
              <Icons.saved className="w-[20px] h-[20px]" />
            )}

            <div>{""}0</div>
          </div>
          <div className="flex items-center flex-wrap gap-x-1">
            <Icons.share className="w-[20px] h-[20px]" />
            <div>
              {""}
              Shares
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <DialogContent className="absolute top-[initial] bottom-0 w-full z-[9000000]  bg-white">
          <CommentSection data={data} mutateParentData={contentMutate} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default Video;
