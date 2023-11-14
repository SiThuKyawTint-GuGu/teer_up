"use client";
import Loading from "@/app/loading";
import { useGetBrowseInfinite, useGetHomeContent } from "@/services/content";
import { useGetContentCategory } from "@/services/contentCategory";
import { ContentData, ContentHomeData } from "@/types/Content";

import { ContentCategoryResponse } from "@/types/ContentCategory";
import { Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import BrowserCategoryContentLayout from "./Components/BroswerCategoryContentLayout";
import BrowserContentLayout from "./Components/BrowerCotentLayout";
const BrowsePage = () => {
  const router = useRouter();
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

  const { data: homeContent, isLoading: homeContentLoading } = useGetHomeContent<any>({
    search: search ?? "",
  });

  const { data, mutate, setSize } = useGetBrowseInfinite({ search: search ?? "", type: type });
  const browseDataArray = useMemo(() => data?.flatMap((page: any) => page?.data) || [], [data]);
  const searchDataArray = useMemo(
    () => homeContent?.data?.flatMap((page: any) => page?.category_contents) || [],
    [search, homeContent]
  );
  const bannerIconUrl = contentCategories?.data?.find((each: any) => each.slug === type)?.banner_icon_url;
  console.log(homeContent?.data?.flatMap((page: any) => page?.category_contents), "error");
  console.log(searchDataArray);
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("category")) {
      setType(params.get("category") || "all");
    }
  }, [params.get("category")]);

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
  const handleCategoryChange = (value: string) => {
    router.push(`?category=${value}${search ? `&search=${search}` : ""}`);
  };

  console.log(visibleItemIndex);
  if (isLoading || homeContentLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="relative w-full h-full pb-[52px]  bg-[#F8F9FB]">
      <Flex className="p-3 w-full sticky top-0 overflow-auto gap-[15px] no-scrollbar bg-white">
        <div
          onClick={() => {
            handleCategoryChange("all");
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
              handleCategoryChange(data?.slug);
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
              {data?.icon_url && <img src={data?.icon_url} className="w-[20px] mr-[10px] h-[20px] inline-block" />}
              <p> {data.name}</p>
            </div>
          </div>
        ))}
      </Flex>
      {type === "all" && (!search || search === "") ? (
        <div className="overflow-y-scroll no-scrollbar h-full bg-[#F8F9FB] ">
          {homeContent?.data && homeContent?.data?.length !== 0 ? (
            homeContent?.data?.map((contentData: ContentHomeData, index: number) => {
              return (
                <Flex direction="column" className="w-full  py-[10px]" key={index}>
                  <Flex direction={"row"} className="w-full  px-[12px] justify-between items-center">
                    <div className=" flex items-center text-2xl font-[800] ">
                      {contentData?.icon_url && (
                        <img src={contentData?.icon_url} className="w-[20px] mr-[10px] h-[20px] inline-block" />
                      )}
                      <p>{contentData?.name}</p>{" "}
                    </div>
                    <p
                      className="text-primary font-[600] ml-[5px] cursor-pointer"
                      onClick={() => {
                        handleCategoryChange(contentData?.slug);
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
                              redir={`/content/${contentData.content.slug}`}
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </Flex>
              );
            })
          ) : (
            <div className="w-full  flex justify-center h-full items-center">
              <p className="text-[16px] font-[600] text-center">No Content</p>
            </div>
          )}
        </div>
      ) : (
        <Flex direction="column" className="w-full h-full pt-[10px]">
          <div className="w-full h-full overflow-y-scroll no-scrollbar " ref={containerRef}>
            {bannerIconUrl && (
              <div className="mx-2  overflow-hidden">
                <img alt="banner" src={bannerIconUrl} className="w-full h-auto rounded-md inline-block object-cover " />
              </div>
            )}

            {browseDataArray && browseDataArray.length !== 0 ? (
              browseDataArray.map((contentData: ContentData, index: number) => (
                <div key={index} className="w-full h-auto">
                  <BrowserCategoryContentLayout
                    data={contentData}
                    contentMutate={mutate}
                    redir={`/content/${contentData.slug}`}
                  />
                </div>
              ))
            ) : (
              <div className={`w-full  flex justify-center  items-center ${bannerIconUrl ? "h-1/2" : "h-full"} `}>
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
