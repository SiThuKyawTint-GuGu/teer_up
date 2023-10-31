"use client";

import { Dialog } from "@/components/ui/Dialog";
import { ContentData } from "@/types/Content";
import { Flex, Grid } from "@radix-ui/themes";
import React from "react";

type VideoDetailProp = {
  data: ContentData;
  contentMutate: any;
};
const VideoDetail: React.FC<VideoDetailProp> = ({ data, contentMutate }) => {
  return (
    <Dialog>
      <Grid columns="1">
        <div className="w-full h-screen">
          <div className="w-full mx-auto h-full relative p-2">
            {data?.content_video && (
              <Flex justify="center" align="center" className="w-full h-full">
                <div className="w-full h-[50vh]">
                  <video
                    className="w-full h-full object-cover"
                    id="myVideo"
                    poster={
                      data.content_video.thumbnail ||
                      "https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg"
                    }
                    preload="none"
                    data-video="0"
                    muted={false}
                    controls
                  >
                    <source src={data.content_video.video_url} className="object-fill" type="video/mp4"></source>
                  </video>
                </div>
              </Flex>
            )}
          </div>
          {/* <div className="w-full fixed bottom-0 max-w-[400px] px-2">
            {data && <LikeCmtBar data={data} mutate={contentMutate} />}
          </div> */}
        </div>
      </Grid>
    </Dialog>
  );
};

export default VideoDetail;
