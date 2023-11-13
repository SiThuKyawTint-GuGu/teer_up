import ReactionBar from "@/components/contentLayout/ReactionBar";
import CardBox from "@/components/ui/Card";
import { Text } from "@/components/ui/Typo/Text";
import { ContentData } from "@/types/Content";
import { Box } from "@radix-ui/themes";

import Link from "next/link";

import React from "react";
type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  index?: number;
};

const ContentLayout: React.FC<ContentlayoutProps> = ({ data, contentMutate }) => {
  return (
    <CardBox className="w-full shadow-xl  rounded-lg h-[100%] justify-start flex-col mt-[15px] mb-[15px]">
      <div className="h-full w-full flex flex-col bg-white shadow-lg">
        <div className="w-full h-[70%]  mx-auto relative">
          <Link href={`/content/${data.slug}`}>
            <div
              className="relative w-full max-w-[400px] h-full  rounded-t-[8px]"
              style={{
                background: `url(${data.image_url}) center / cover`,
              }}
            >
              {data.type !== "video" && (
                <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] tracking-[0.42px] rounded-bl-[8px] shadow-lg uppercase">
                  {data.type}
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="w-full h-full pt-[16px] px-[12px]">
          <div className="w-full h-full">
            <div className="flex flex-col justify-between w-full h-full">
              <Box>
                <h1 className="font-[700] text-[24px]">{data.title}</h1>
                {data.description && (
                  <div className="w-full h-full">
                    <div className="flex flex-col w-full">
                      <Text>
                        {data.description.slice(0, 100)}

                        {data.description.length > 100 && (
                          <Text as="span" className="text-primary">
                            {"..."}See more
                          </Text>
                        )}
                      </Text>
                    </div>
                  </div>
                )}
              </Box>
              <div className="mt-2 w-full">
                <div className="w-full pt-3">
                  <hr className="w-full h-[1px] bg-slateGray" />
                </div>
                <ReactionBar data={data} contentMutate={contentMutate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default ContentLayout;
