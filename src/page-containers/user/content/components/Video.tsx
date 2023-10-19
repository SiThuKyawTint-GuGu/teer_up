"use client";

import { Icons } from "@/components/ui/Images";
import CmtInput from "@/components/ui/Inputs/CmtInput";
import { Text } from "@/components/ui/Typo/Text";
import { useGetComment, useGetContent, useLikeContent, usePostComment } from "@/services/content";
import { ParamsType } from "@/services/user";
import { CommentData, CommentResponse, ContentData, ContentType } from "@/types/Content";
import { showTimeDifference } from "@/utils/time";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
};
const Video: React.FC<VideoProps> = ({ data, setVideoRef, autoplay }) => {
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

      <div
        className={`absolute flex flex-col items-baseline w-[300px] cursor-pointer bottom-5 left-3 z-[1000] text-[20px] font-[600] ${
          showDescription && "transition-all duration-1000 ease-in-out"
        }`}
        onClick={() => setShowDescription(prev => !prev)}
      >
        <Text>{data.title}</Text>
        {!showDescription ? (
          <div className="flex flex-wrap gap-x-1">
            <Text>{data.description.slice(0, 15)}...</Text>
            <span>See more</span>
          </div>
        ) : (
          <Text>{data.description}</Text>
        )}
      </div>
      <LikeandCmt data={data} setShowCmt={setShowCmt} showCmt={showCmt} />
    </div>
  );
};

const showTime = (createTime: string) => {
  const { days, hours, minutes } = showTimeDifference(createTime);
  if (days) return `${days} day ago`;
  if (hours) return `${hours} hour ago`;
  return `${minutes} minute ago`;
};

export default Video;
type CmtandLikeProps = {
  data: ContentData;
  showCmt: Boolean;
  setShowCmt: (v: boolean) => void;
};
const LikeandCmt: React.FC<CmtandLikeProps> = ({ data, setShowCmt, showCmt }) => {
  useEffect(() => {
    setShowCmt(false);
  }, []);
  const { mutate: upDateContent } = useGetContent<ParamsType, ContentType>({
    page: 1,
    pageSize: 20,
  });
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
      <div className="absolute right-3 bottom-[1rem] items-end flex flex-col flex-wrap gap-y-[32px]">
        <div className="flex flex-col flex-wrap gap-[10px] w-full">
          <Icons.like
            className="w-[40px] h-[40px]"
            onClick={async () =>
              await likeVideo(
                { id: data.id },
                {
                  onSuccess: () => {
                    upDateContent();
                  },
                }
              )
            }
            // className="filter drop-shadow-[0px 8px 4px rgba(0, 0, 0, 0.50)]"
          />
          <div className="text-[18px] font-[600] text-center">{data.likes}</div>
        </div>
        <div className="flex flex-col flex-wrap gap-[10px]">
          <Icons.comment className="w-[40px] h-[40px]" onClick={() => setShowCmt(!showCmt)} />
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
      {showCmt && (
        <div className="absolute w-full bottom-0 rounded-t-[16px] bg-white p-[8px] z-[9999999] text-black">
          <div
            className="bg-primary rounded-[6px] w-[60px] h-[2px] mx-auto"
            onClick={() => setShowCmt(!showCmt)}
          />
          <div className="my-3 text-[16px] font-[600]">{cmts?.data.length} comments</div>

          {cmts?.data.length !== 0 &&
            cmts?.data.map((data: CommentData, index: number) => (
              <div className="flex items-start  w-full h-full mb-2" key={index}>
                <div className="bg-slateGray  rounded-full w-[32px] h-[32px]" />
                <div className="flex flex-col w-full ms-2">
                  <div className="flex items-center flex-wrap gap-x-2">
                    <Text as="div" className="text-[16px] font-[600]">
                      {"."}
                      {data.user.name}
                    </Text>
                    <Text as="span" className="text-[14px] font-[300]">
                      {showTime(data.created_at)}
                    </Text>
                  </div>
                  <div className="text-start">{data.comment}</div>
                </div>
              </div>
            ))}

          {/* Comment Input */}
          <div className="w-full h-full relative">
            <div className=" w-full">
              <div className="w-full flex font-[16px]">
                <CmtInput setValue={setCommentValue} value={commentValue} />
                <button
                  onClick={postSubmitHandler}
                  className={`${isMutating ? "text-slateGray" : "text-primary"} p-1`}
                  disabled={isMutating}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
