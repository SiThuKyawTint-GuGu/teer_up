"use client";

import Loading from "@/app/loading";
import { useGetBrowseInfinite, useGetHomeContent } from "@/services/content";
import { useGetContentCategory } from "@/services/contentCategory";
import { ContentData } from "@/types/Content";
import { ContentCategoryResponse } from "@/types/ContentCategory";
import { Flex } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import BrowserCategoryContentLayout from "./Components/BroswerCategoryContentLayout";
import BrowserContentLayout from "./Components/BrowerCotentLayout";

const BrowsePage = () => {
  const [type, setType] = useState<string>("all");
  const searchParams = useSearchParams();
  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const search = useMemo(() => {
    return searchParams.get("search");
  }, [searchParams]);
  const {
    data: contentCategories,
    isLoading,
    mutate: contentDataMutate,
  } = useGetContentCategory<ContentCategoryResponse>();
  const { data: homeContent, isLoading: homeContentLoading, mutate: homeContentMutate } = useGetHomeContent();
  const { data, mutate, setSize } = useGetBrowseInfinite({ search: search ?? "", type: type });
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
  if (isLoading || homeContentLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="relative w-full h-full pb-[70px]  bg-[#F8F9FB]">
      <Flex className="p-3 w-full sticky top-0 overflow-auto gap-[15px] no-scrollbar bg-white">
        <div
          onClick={() => {
            setType("all");
          }}
          className={`cursor-pointer border-primary  px-10 flex-0 flex-shrink-0  py-1 rounded-lg border ${
            type == "all" ? "bg-[#FCE8EA] " : "border-[#E4E4E4] hover:border-primary"
          }     `}
        >
          {" "}
          <p
            className="w-auto font-[600] text-[16px] text-center"
            // className={`w-auto   ${
            //   type === data.value && "border-b-[2px]  text-[16px] font-[600]"
            // }`}
          >
            All
          </p>
        </div>
        {contentCategories?.data?.map((data, index: number) => (
          <div
            key={index}
            onClick={() => {
              setType(data?.slug);
            }}
            className={`cursor-pointer px-10 flex-0 flex-shrink-0  py-1 rounded-lg border border-primary ${
              type == data.slug ? " bg-[#FCE8EA] " : "border-[#E4E4E4] hover:border-primary"
            }     `}
          >
            {" "}
            <div
              className="w-auto font-[600] text-[16px] flex space-between items-center "
              // className={`w-auto   ${
              //   type === data.value && "border-b-[2px]  text-[16px] font-[600]"
              // }`}
            >
              <p> {data.name}</p>

              {data?.icon_url && (
                <img src={data?.icon_url} className="w-[20px] ml-[10px] h-[20px] ml-[5px] inline-block" />
              )}
            </div>
          </div>
        ))}
      </Flex>
      {type === "all" ? (
        <div className="overflow-y-scroll h-full bg-[#F8F9FB] ">
          {homeContent?.data &&
            homeContent?.data?.length !== 0 &&
            homeContent?.data?.map((contentData, index: number) => {
              return (
                <Flex direction="column" className="w-full  py-[10px]" key={index}>
                  <Flex direction={"row"} className="w-full  px-[12px] justify-between items-center">
                    <p className="text-2xl font-[800]"> {contentData?.name} </p>
                    <p
                      className="text-primary font-[600] ml-[5px] cursor-pointer"
                      onClick={() => {
                        setType(contentData.slug);
                      }}
                    >
                      Show More
                    </p>
                  </Flex>
                  <div className="w-full h-full  flex  overflow-x-scroll no-scrollbar">
                    {contentData?.category_contents && contentData?.category_contents.length === 0 ? (
                      <div className="w-full  flex justify-center h-[200px] items-center">
                        <p className="text-[16px] font-[600] text-center">No Content</p>
                      </div>
                    ) : (
                      contentData?.category_contents.map((contentData: any, index: number) => {
                        return (
                          <div key={index} className="flex-0 flex-shrink-0 basis-3/4 h-auto ">
                            <BrowserContentLayout
                              key={index}
                              data={contentData?.content}
                              contentMutate={mutate}
                              redir={`/content/${contentData.slug}`}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </Flex>
              );
            })}
        </div>
      ) : (
        <Flex direction="column" className="w-full h-full pt-[10px]">
          <div className="w-full h-full overflow-y-scroll no-scrollbar" ref={containerRef}>
            {browseDataArray && browseDataArray.length !== 0 ? (
              browseDataArray.map((contentData: ContentData, index: number) => (
                <div key={index} className="w-full h-[400px]">
                  <BrowserCategoryContentLayout
                    data={contentData}
                    contentMutate={mutate}
                    redir={`/content/${contentData.slug}`}
                  />
                </div>
              ))
            ) : (
              <div className="w-full  flex justify-center h-full items-center">
                <p className="text-[16px] font-[600] text-center">No Content</p>
              </div>
            )}
          </div>
        </Flex>
      )}
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
