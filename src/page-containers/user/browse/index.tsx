"use client";
import Loading from "@/app/loading";
import { useGetBrowseInfinite, useGetHomeContent } from "@/services/content";
import { useGetContentCategory } from "@/services/contentCategory";
import { ContentData, ContentHomeData } from "@/types/Content";

import { ContentCategoryResponse } from "@/types/ContentCategory";
import { getLocalStorage, removeLocalStorage } from "@/utils";
import { Box, Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BrowserCategoryContentLayout from "./Components/BroswerCategoryContentLayout";
import BrowserContentLayout from "./Components/BrowerCotentLayout";

const BrowsePage: React.FC = () => {
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

  const params = useSearchParams();
  const parentContainer = useRef<HTMLDivElement>(null);
  const currentCategoryElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (params.get("category")) {
      setType(params.get("category") || "all");
    }
  }, [params.get("category")]);

  useEffect(() => {
    const storeContentList = getLocalStorage("contentListPosition");
    const targetElement = document.getElementById(`${storeContentList}`);
    const storeHomeContent = getLocalStorage("home-content-id");

    const targetContentElement = document.getElementById(`${storeHomeContent}`);
    if (targetElement) {
      targetElement.scrollIntoView({});
      removeLocalStorage("contentListPosition");
    } else if (targetContentElement) {
      targetContentElement.scrollIntoView({});
      removeLocalStorage("home-content-id");
    }
  }, [type]);

  useEffect(() => {
    if (parentContainer.current && currentCategoryElement.current) {
      const remainingSpace = parentContainer?.current?.clientWidth - currentCategoryElement.current.offsetWidth;
      const spaceLeftAndRight = remainingSpace / 2;
      parentContainer.current!.scrollLeft = currentCategoryElement.current.offsetLeft - spaceLeftAndRight;
    }
  }, [parentContainer.current, currentCategoryElement.current, type]);

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
      <Flex
        className="p-3 w-full sticky top-0 overflow-auto gap-[15px] no-scrollbar bg-white scroll-smooth"
        ref={parentContainer}
      >
        <div
          onClick={() => {
            handleCategoryChange("all");
          }}
          className={`cursor-pointer border-primary  px-10 flex-0 flex-shrink-0  py-1 rounded-lg border ${
            type == "all" ? "bg-[#FCE8EA] " : "border-[#E4E4E4] hover:border-primary"
          }     `}
          {...(type === "all" && { ref: currentCategoryElement })}
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
            {...(type === data.slug && { ref: currentCategoryElement })}
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
        <div className="overflow-y-scroll no-scrollbar h-full bg-[#F8F9FB] scroll-smooth" id="content-list-container">
          {homeContent?.data && homeContent?.data?.length !== 0 ? (
            homeContent?.data?.map((contentData: ContentHomeData, index: number) => {
              return (
                <Flex
                  direction="column"
                  className="w-full  py-[10px]"
                  key={index}
                  id={"content-list-" + contentData.id.toString()}
                >
                  <Flex direction={"row"} className="w-full  px-[12px] justify-between items-center">
                    <div className=" flex items-center text-2xl font-[800] ">
                      {contentData?.icon_url && (
                        <img src={contentData?.icon_url} className="w-[20px] mr-[10px] h-[20px] inline-block" />
                      )}
                      <p>{contentData?.name}</p>
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
                  <p
                    className="
                  text-[14px] text-[#4B5563] font-[400] px-[12px] py-[5px]
                  "
                  >
                    {contentData?.sub_title}
                  </p>
                  <div className="w-full h-full  flex  overflow-x-scroll no-scrollbar">
                    {contentData?.category_contents && contentData?.category_contents.length === 0 ? (
                      <div className="w-full  flex justify-center h-[200px] items-center">
                        <p className="text-[16px] font-[600] text-center">No Content</p>
                      </div>
                    ) : (
                      contentData?.category_contents.map((c: any, index: number) => {
                        return (
                          <div key={index} className="flex-0 flex-shrink-0 basis-3/4 h-auto">
                            <BrowserContentLayout
                              key={index}
                              data={c?.content}
                              contentListId={"content-list-" + contentData.id.toString()}
                              contentMutate={mutate}
                              redir={`/content/${c.content.slug}`}
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
          <div
            className="w-full h-full overflow-y-scroll no-scrollbar scroll-smooth"
            ref={containerRef}
            id="content-list-container"
          >
            <Box className="">
              {bannerIconUrl && (
                <div className="mx-2  overflow-hidden pb-[15px] mb-[10px] border-b border-b-[#BDC7D5]">
                  <img
                    alt="banner"
                    src={bannerIconUrl}
                    className="w-full h-auto rounded-md inline-block object-cover "
                  />
                </div>
              )}
            </Box>

            {browseDataArray && browseDataArray.length !== 0 ? (
              browseDataArray.map((contentData: ContentData, index: number) => (
                <div key={index} className="w-full h-auto" id={"home-content-" + contentData.id.toString()}>
                  <BrowserCategoryContentLayout
                    data={contentData}
                    contentMutate={mutate}
                    id={`home-content-${contentData.id.toString()}`}
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
