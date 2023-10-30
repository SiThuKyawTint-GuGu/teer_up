"use client";

import { Text } from "@/components/ui/Typo/Text";
import { ParamsType, useGetContentInfinite } from "@/services/content";
import { ContentData, ContentType } from "@/types/Content";
import { Flex } from "@radix-ui/themes";
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
  const differentContent = (data: ContentData) => {
    if (data.type === "event" && data.content_event)
      return <BrowserContentLayout data={data} contentMutate={mutate} redir={`/events/${data.slug}`} />;
    if (data.type === "article" && data.content_article)
      return <BrowserContentLayout data={data} contentMutate={mutate} redir={`/articles/${data.slug}`} />;
    if (data.type === "opportunity" && data.content_opportunity)
      return <BrowserContentLayout data={data} contentMutate={mutate} redir={`/opportunity/${data.slug}`} />;
    if (data.type === "pathway")
      return <BrowserContentLayout data={data} contentMutate={mutate} redir={`/pathway/${data.slug}`} />;
    if (data.type === "mentor")
      return <BrowserContentLayout data={data} contentMutate={mutate} redir={`/mentor/${data.slug}`} />;
  };

  return (
    <div className="relative w-full h-full">
      <Flex className="p-3 w-full sticky top-0 overflow-auto no-scrollbar">
        {BrowsePageHeader.map((data: HeaderType, index: number) => (
          <div key={index} onClick={() => setType(data.value)} className="cursor-pointer">
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
                      {differentContent(contentData)}
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
  {
    text: "Mentor",
    value: "mentor",
  },
];
