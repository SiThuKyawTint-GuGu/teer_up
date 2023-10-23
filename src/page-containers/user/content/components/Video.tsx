"use client";

import { Icons } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetComment, useLikeContent, usePostComment } from "@/services/content";
import { ParamsType } from "@/services/user";
import { CommentResponse, ContentData } from "@/types/Content";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
  contentMutate: any;
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
        {/* <LikeandCmt
          data={data}
          setShowCmt={setShowCmt}
          showCmt={showCmt}
          contentMutate={contentMutate}
        /> */}
      </div>
      <div className="flex justify-between p-3 bg-white">
        <div className="flex items-center flex-wrap gap-x-[10px]">
          <Icons.like className="w-[20px] h-[20px]" />
          <div>
            {""}
            {data.likes}
          </div>
        </div>
        {/* <DialogTrigger> */}
        <div className="flex items-center flex-wrap gap-x-[10px]">
          <Icons.comment className="w-[20px] h-[20px]" />
          <div>
            {""}
            {data.comments}
          </div>
        </div>
        {/* </DialogTrigger> */}
        <div className="flex items-center flex-wrap gap-x-[10px]">
          <Icons.saved className="w-[20px] h-[20px]]" />
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
  );
};

export default Video;
type CmtandLikeProps = {
  data: ContentData;
  showCmt: Boolean;
  contentMutate: any;
  setShowCmt: (v: boolean) => void;
};
const LikeandCmt: React.FC<CmtandLikeProps> = ({ data, setShowCmt, showCmt, contentMutate }) => {
  const { data: cmts, mutate: mutateCmt } = useGetComment<ParamsType, CommentResponse>(data.id, {
    cursor: 1,
    pageSize: 20,
  });
  const [commentValue, setCommentValue] = useState<string>("");

  const { trigger: postComment, isMutating } = usePostComment();
  const { trigger: likeVideo } = useLikeContent();

  const postSubmitHandler = async () => {
    const formData = {
      // parent_id: data.id,
      id: data.id,
      comment: commentValue,
    };
    await postComment(formData, {
      onSuccess: () => {
        mutateCmt();
        setCommentValue("");
      },
    });
  };

  return (
    <>
      {/* <div className="absolute right-3 bottom-[1rem] items-end flex flex-col flex-wrap gap-y-[32px]">
        <div className="flex flex-col flex-wrap gap-[10px] w-full">
          <Icons.like
            className="w-[40px] h-[40px]"
            onClick={async () =>
              await likeVideo(
                { id: data.id },
                {
                  onSuccess: () => {
                    contentMutate();
                  },
                }
              )
            }
            // className="filter drop-shadow-[0px 8px 4px rgba(0, 0, 0, 0.50)]"
          />
          <div className="text-[18px] font-[600] text-center">{data.likes}</div>
        </div>
        <div className="flex flex-col flex-wrap gap-[10px]">
          <Icons.comment className="w-[40px] h-[40px]" onClick={() => setShowCmt(true)} />
          <div className="text-[18px] font-[600] text-center">{data.comments}</div>
        </div>
        <div className="flex flex-col flex-wrap gap-[10px] ">
          <Icons.saved className="w-[40px] h-[40px]" />
          <div className="text-[18px] font-[600] text-center"></div>
        </div>
        <div>
          <Icons.share className="w-[40px] h-[40px]" />
        </div>
      </div> */}
    </>
  );
};
