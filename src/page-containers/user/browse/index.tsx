"use client";

import { Text } from "@/components/ui/Typo/Text";
import { ParamsType, useGetContentInfinite } from "@/services/content";
import { ContentData, ContentType } from "@/types/Content";
import { Flex, Grid } from "@radix-ui/themes";
import { useState } from "react";
import BrowserContentLayout from "./Components/BrowerCotentLayout";

const BrowsePage = () => {
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>("");

  const { data, mutate } = useGetContentInfinite<ParamsType>({
    page: page,
    pagesize: 20,
    type: type,
  });

  return (
    <Grid columns="1">
      <Flex justify="between" className="p-3 max-w-[400px] w-full] overflow-x-visible">
        {BrowsePageHeader.map((data: HeaderType, index: number) => (
          <div key={index} onClick={() => setType(data.value)} className="cursor-pointer">
            <Text as="span" className={`${type === data.value && "border-b-[2px] border-primary"}`}>
              {data.text}
            </Text>
          </div>
        ))}
      </Flex>
      <Flex direction="column" className="w-full h-full">
        {data &&
          data.length > 0 &&
          data.map(
            (contentArray: ContentType, index: number) =>
              contentArray.data &&
              contentArray.data.length > 0 && (
                <div className="w-full h-[85vh] overflow-y-scroll" key={index}>
                  {contentArray.data.map((contentData: ContentData, index: number) => (
                    <div key={index} className="w-full">
                      {contentData.type !== "onboarding" && (
                        <BrowserContentLayout data={contentData} contentMutate={mutate}>
                          {contentData.description && (
                            <div className="w-full h-full">
                              <div className="flex flex-col w-full h-[40vh]">
                                <Text>
                                  {contentData.description.slice(0, 100)}

                                  {contentData.description.length > 100 && (
                                    <Text as="span" className="text-primary">
                                      {"..."}See more
                                    </Text>
                                  )}
                                </Text>
                              </div>
                            </div>
                          )}
                        </BrowserContentLayout>
                      )}
                    </div>
                  ))}
                </div>
              )
          )}
      </Flex>
    </Grid>
  );
};

export default BrowsePage;

type HeaderType = {
  text: string;
  value: string;
};

const BrowsePageHeader: HeaderType[] = [
  {
    text: "All",
    value: "",
  },
  {
    text: "Video",
    value: "video",
  },
  {
    text: "Opportunity",
    value: "opportunity",
  },
  {
    text: "Event",
    value: "event",
  },
  {
    text: "Pathway",
    value: "pathway",
  },
  {
    text: "Article",
    value: "article",
  },
];
