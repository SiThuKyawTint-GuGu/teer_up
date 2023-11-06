"use client";

import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Typo/Text";
import { useLikeContent, useSaveContent } from "@/services/content";
import { ContentData } from "@/types/Content";
import { Flex } from "@radix-ui/themes";

import { useEffect, useRef, useState } from "react";
import CommentSection from "../../../../components/contentLayout/CommentSection";
import Share from "../../../admin/content/Share";
type VideoProps = {
  data: ContentData;
  setVideoRef: any;
  autoplay: boolean;
  contentMutate: any;
  index?: number;
};
const Video: React.FC<VideoProps> = ({ data, setVideoRef, autoplay, contentMutate }) => {
  const { trigger: like } = useLikeContent();
  const { trigger: contentSave } = useSaveContent();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showCmt, setShowCmt] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);

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
          className="w-full h-[80%]  md:aspect-video relative text-white"
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
            className={`absolute flex flex-col items-baseline w-full cursor-pointer bg-slate-700 opacity-[0.5]  bottom-0 px-3 py-3 z-[1000] text-[20px] font-[600] ${
              showDescription && "transition-all duration-1000 ease-in-out"
            }`}
          >
            {!showDescription && (
              <Flex direction="column">
                <Text>{data.title}</Text>
                {data.description.length > 50 ? (
                  <div onClick={() => setShowDescription(true)}>
                    {data.title.slice(0, 50)}
                    <div>...See More</div>
                  </div>
                ) : (
                  <Text>{data.title}</Text>
                )}
              </Flex>
            )}

            {showDescription && <div onClick={() => setShowDescription(false)}>{data.title}</div>}
          </div>
        </div>
        <CardBox className="flex justify-between p-3">
          <Button variant="destructive" className="flex items-center flex-wrap gap-x-[10px]" onClick={likePost}>
            {data.is_liked ? (
              <Icons.likefill className="w-[20px] h-[20px] text-primary" />
            ) : (
              <Icons.like className="w-[20px] h-[20px]" />
            )}
            <div>
              {""}
              {data.likes}
            </div>
          </Button>
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
          <Button variant="destructive" className="flex items-center flex-wrap gap-x-[10px]" onClick={saveContent}>
            {data.is_saved ? (
              <Icons.savedFill className="w-[20px] h-[20px] text-primary" />
            ) : (
              <Icons.saved className="w-[20px] h-[20px]" />
            )}

            <div>
              {""}
              {data.saves}
            </div>
          </Button>
          <button className="flex items-center flex-wrap gap-x-1" onClick={() => setOpenShare(true)}>
            <Icons.share className="w-[20px] h-[20px]" />
            <div>
              {""}
              Share
            </div>
          </button>
        </CardBox>
      </div>
      {openModal && (
        <DialogContent className="bg-white top-[initial] bottom-0 max-w-[400px] px-4 pt-8 pb-2 translate-y-0 rounded-10px-tl-tr">
          <CommentSection data={data} mutateParentData={contentMutate} />
        </DialogContent>
      )}
      {openShare && (
        <Modal onClose={() => setOpenShare(false)}>
          <Share url={`/content/${data.slug}`} />
        </Modal>
      )}
    </Dialog>
  );
};

export default Video;
