"use client";

import LikeCmtBar from "@/components/contentLayout/LikeCmtBar";
import { Dialog } from "@/components/ui/Dialog";
import { useIsTruncated } from "@/hooks/useIsTruncated";
import { ContentData } from "@/types/Content";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Flex, Grid } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
type VideoDetailProp = {
  data: ContentData;
  contentMutate: any;
};
const VideoDetail: React.FC<VideoDetailProp> = ({ data, contentMutate }) => {
  const [isPlayed, setIsPlayed] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const detailDescription = useRef<HTMLParagraphElement>(null);
  const isTruncated = useIsTruncated(detailDescription);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (!isPlayed) {
        if (videoRef.current.paused) {
          videoRef.current.play();
        }
      } else {
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
      setIsPlayed(isPlayed => !isPlayed);
    }
  };

  return (
    <Dialog>
      <Grid columns="1">
        <div className="w-full h-screen">
          <div className="w-full mx-auto h-full relative p-2">
            {data?.content_video && (
              <Flex className="w-full h-full">
                <div className="w-full h-[88vh] relative">
                  <video
                    className={`w-full  h-full object-cover rounded-md`}
                    id="myVideo"
                    poster={
                      data.image_url ||
                      "https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg"
                    }
                    preload="none"
                    data-video="0"
                    muted={false}
                    onClick={() => handlePlayVideo()}
                    ref={videoRef}
                    loop
                    playsInline
                    autoPlay
                  >
                    <source src={data.content_video.video_url} className="object-fill" type="video/mp4"></source>
                  </video>
                  {!isPlayed && (
                    <div className="absolute top-1/2 right-[45%]">
                      <PlayArrowRoundedIcon
                        onClick={handlePlayVideo}
                        sx={{ color: "white", fontSize: 60, opacity: 0.5 }}
                      />
                    </div>
                  )}
                  <div className="absolute bottom-0 text-white font-semibold bg-black bg-opacity-30 rounded-b-md">
                    <div className="overflow-hidden p-3">
                      <p className={`${readMore ? "" : "line-clamp-3"} transition-all`} ref={detailDescription}>
                        {data.description}
                      </p>
                      {isTruncated && (
                        <button className="font-semibold text-primary" onClick={() => setReadMore(!readMore)}>
                          {!readMore ? "See more" : "Less"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Flex>
            )}
          </div>
          <div className="w-full fixed bottom-0 max-w-[400px] px-2">
            {data && <LikeCmtBar data={data} mutate={contentMutate} />}
          </div>
        </div>
      </Grid>
    </Dialog>
  );
};

export default VideoDetail;
