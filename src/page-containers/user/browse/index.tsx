"use client";

import { ParamsType, useGetContentInfinite } from "@/services/content";
import { ContentData, ContentType } from "@/types/Content";
import { Flex, Grid } from "@radix-ui/themes";
import { useState } from "react";
import BrowserContentLayout from "./Components/BrowerCotentLayout";

const BrowsePage = () => {
  const [page, setPage] = useState<number>(1);

  const { data, mutate } = useGetContentInfinite<ParamsType>({
    page: page,
    pageSize: 20,
  });

  return (
    <Grid columns="1">
      <Flex justify="between" className="p-3">
        {BrowsePageHeader.map((data: HeaderType, index: number) => (
          <div key={index}>{data.text}</div>
        ))}
      </Flex>
      <Flex direction="column">
        {data &&
          data.length > 0 &&
          data.map(
            (contentArray: ContentType, index: number) =>
              contentArray.data &&
              contentArray.data.length > 0 && (
                <div className="w-full h-[85vh] overflow-y-scroll" key={index}>
                  {contentArray.data.map((contentData: ContentData, index: number) => (
                    <div key={index} className="w-full">
                      <BrowserContentLayout data={contentData} contentMutate={mutate}>
                        Hello This is description
                      </BrowserContentLayout>
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
};

const BrowsePageHeader: HeaderType[] = [
  {
    text: "All",
  },
  {
    text: "Video",
  },
  {
    text: "Opportunity",
  },
  {
    text: "Event",
  },
  {
    text: "Pathway",
  },
];
