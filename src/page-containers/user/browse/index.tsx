"use client";

import { Text } from "@/components/ui/Typo/Text";
import { ParamsType, useGetContentInfinite } from "@/services/content";
import { ContentData, ContentType } from "@/types/Content";
import { Flex } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import BrowserContentLayout from "./Components/BrowerCotentLayout";

const BrowsePage = () => {
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>("all");
  const searchParams = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search");
  }, [searchParams]);

  const { data, mutate } = useGetContentInfinite<ParamsType>({
    page: page,
    pagesize: 20,
    type: type,
    search: search ? search : undefined,
  });

  return (
    <div className="relative w-full h-full pb-[60px]">
      <Flex className="p-3 w-full sticky top-0 overflow-auto no-scrollbar">
        {BrowsePageHeader.map((data: HeaderType, index: number) => (
          <div
            key={index}
            onClick={() => {
              setType(data.value);
            }}
            className="cursor-pointer"
          >
            <Text as="div" className={`w-auto px-3 ${type === data.value && "border-b-[2px] border-primary"}`}>
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
                <div className="w-full h-full overflow-y-scroll no-scrollbar" key={index}>
                  {contentArray.data.map((contentData: ContentData, index: number) => (
                    <div key={index} className="w-full">
                      <BrowserContentLayout
                        data={contentData}
                        contentMutate={mutate}
                        redir={`/content/${contentData.slug}`}
                      />
                    </div>
                  ))}
                </div>
              )
          )}
      </Flex>
    </div>
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
    value: "all",
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
  {
    text: "Mentor",
    value: "mentor",
  },
];
