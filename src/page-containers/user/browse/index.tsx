"use client";

import NotFound from "@/components/shared/NotFound";
import { Button } from "@/components/ui/Button";
import { Image } from "@/components/ui/Images";
import { Text } from "@/components/ui/Typo/Text";
import { useGetBrowseInfinite } from "@/services/content";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import BrowserContentLayout from "./Components/BrowerCotentLayout";

const BrowsePage = () => {
  const [type, setType] = useState<string>("all");
  const searchParams = useSearchParams();
  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const search = useMemo(() => {
    return searchParams.get("search");
  }, [searchParams]);

  const { data, mutate, setSize } = useGetBrowseInfinite({ search: search, type: type });
  const browseDataArray = useMemo(() => data?.flatMap((page: any) => page?.data) || [], [data]);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleScroll = () => {
        const scrollPosition = container.scrollTop;
        const newIndex = Math.round(scrollPosition / 400);

        setVisibleItemIndex(newIndex);

        if (container.scrollHeight - container.scrollTop - container.clientHeight < 1) {
          setSize(s => s + 1);
        }
      };

      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [visibleItemIndex]);

  console.log(visibleItemIndex);

  return (
    <div className="relative w-full h-full pb-[70px]">
      <Flex className="p-3 w-full sticky top-0 overflow-auto gap-[24px] no-scrollbar bg-white">
        {BrowsePageHeader.map((data: HeaderType, index: number) => (
          <div
            key={index}
            onClick={() => {
              setType(data.value);
            }}
            className="cursor-pointer"
          >
            {" "}
            <Text
              as="div"
              className={`w-auto   ${
                type === data.value && "border-b-[2px] border-primary text-primary text-[16px] font-[600]"
              }`}
            >
              {data.text}
            </Text>
          </div>
        ))}
      </Flex>
      <Flex direction="column" className="w-full h-full pt-[10px]">
        <div className="w-full h-full overflow-y-scroll no-scrollbar" ref={containerRef}>
          {browseDataArray && browseDataArray.length !== 0 ? (
            browseDataArray.map((contentData: ContentData, index: number) => (
              <div key={index} className="w-full h-[400px]">
                <BrowserContentLayout
                  data={contentData}
                  contentMutate={mutate}
                  redir={`/content/${contentData.slug}`}
                />
              </div>
            ))
          ) : (
            <div className="pt-[100px]">
              {search == null ? (
                <NotFound
                  icon={<Image src="/uploads/icons/connection.svg" width={80} height={80} alt="saved" />}
                  content={
                    <>
                      <Text>There’s no contents.</Text>
                      <Text>Please check your internet connection.</Text>
                    </>
                  }
                  link={
                    <Link href="/browse">
                      <Button>Browse now</Button>
                    </Link>
                  }
                />
              ) : (
                <NotFound
                  icon={<Image src="/uploads/icons/connection.svg" width={80} height={80} alt="saved" />}
                  content={
                    <>
                      {type == "all" ? (
                        <Text>There’s no contents.</Text>
                      ) : (
                        <Text>
                          No {type}s for "{search}".
                        </Text>
                      )}
                      <Text>Please try a different keyword.</Text>
                    </>
                  }
                />
              )}
            </div>
          )}
        </div>
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
