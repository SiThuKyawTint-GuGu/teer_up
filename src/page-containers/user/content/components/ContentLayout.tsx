import ReactionBar from "@/components/contentLayout/ReactionBar";
import CardBox from "@/components/ui/Card";
import { ContentData } from "@/types/Content";
import { Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  index?: number;
};

const ContentLayout: React.FC<ContentlayoutProps> = ({ data, contentMutate }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [comments, setComments] = useState<number>(0);

  useEffect(() => {
    setComments(data.comments);
  }, []);
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      const boxHeight = element.parentElement?.clientHeight || 0;
      const padding = 16;
      const hasOverflow = element.scrollHeight > element.clientHeight;

      // Update state based on overflow
      setIsOverflowing(hasOverflow);
      const newMaxHeight = boxHeight - padding;

      // Check if the new max height is different
      if (newMaxHeight !== maxHeight) {
        setMaxHeight(newMaxHeight);
      }
    }
  }, [maxHeight, contentRef, data.description]);

  return (
    <CardBox className="w-full shadow-xl rounded-lg h-[95%] justify-start flex-col">
      <Grid rows="3" className="h-full w-full flex flex-col bg-white shadow-lg">
        <Link
          href={`/content/${data?.slug}`}
          className={`w-full ${data.type !== "mentor" ? "h-[200px]" : "h-[300px]"} mx-auto relative block`}
        >
          <div
            className={`relative w-full max-w-[400px] ${
              data.type !== "mentor" ? "h-[200px]" : "h-[300px]"
            } rounded-t-[8px]`}
            style={{
              background: `url(${data?.image_url}) center / cover`,
            }}
          >
            {data.type !== "video" && (
              <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] tracking-[0.42px] rounded-bl-[8px] shadow-lg uppercase">
                {data.type}
              </div>
            )}
          </div>
        </Link>
        <div className="w-full h-full pt-[16px] px-[16px]">
          <Link href={`/content/${data?.slug}`}>
            <Flex direction="column" className="w-full h-full">
              {/* Ref to get the content height and dynamically set max height */}
              <div
                ref={contentRef}
                className="flex flex-col"
                // style={{ maxHeight: maxHeight !== undefined ? `${maxHeight - 30}px` : "none", overflow: "hidden" }}
              >
                <Text className="text-[24px] font-[700] leading-[32px]">{data?.title}</Text>
                <Text>
                  {data?.description?.slice(0, 150)}

                  {data?.description?.length > 150 && (
                    <Text as="span" className="text-primary">
                      {"..."}See more
                    </Text>
                  )}
                </Text>
              </div>
              {/* {isOverflowing && (
                <div>
                  ...<Text className="text-primary">see more</Text>
                </div>
              )} */}
            </Flex>
          </Link>
        </div>
        <div className="mt-2 w-full px-[16px]">
          <div className="w-full pt-3">
            <hr className="w-full h-[1px] bg-slateGray" />
          </div>
          <ReactionBar data={data} contentMutate={contentMutate} comments={comments} setComments={setComments} />
        </div>
      </Grid>
    </CardBox>
  );
};

export default ContentLayout;
