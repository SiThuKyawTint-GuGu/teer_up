/* eslint-disable no-unused-vars */
"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { useGetContentCategory } from "@/services/contentCategory";
import { getLocalStorage, removeLocalStorage } from "@/utils";
import { ContentCategoryResponse } from "@/types/ContentCategory";

const ComponentsSidebar: React.FC<{ handleCategoryChange: (value:string) => void}> = ({ handleCategoryChange }) => {
  const [type, setType] = useState<string>("all");
  const parentContainer = useRef<HTMLDivElement>(null);
  const currentCategoryElement = useRef<HTMLDivElement>(null);
  const { data: contentCategories } = useGetContentCategory<ContentCategoryResponse>();

  useEffect(() => {
    if (contentCategories && contentCategories.data) {
      const allCategory = contentCategories.data.find((category: any) => category.slug === "all");
      if (allCategory) {
        setType(allCategory.slug);
      }
    }
  }, [contentCategories]);

  useEffect(() => {
    const storeContentList = getLocalStorage("contentListPosition");
    const storeHomeContent = getLocalStorage("home-content-id");

    if (type === "all") {
      const targetElement = document.getElementById(`${storeContentList}`);
      const targetContentElement = document.getElementById(`${storeHomeContent}`);
      if (targetElement) {
        targetElement.scrollIntoView({});
        removeLocalStorage("contentListPosition");
      } else if (targetContentElement) {
        targetContentElement.scrollIntoView({});
        removeLocalStorage("home-content-id");
      }
    }

    return () => {};
  }, [type]);

  return (
    <Flex
      style={{ top: "5.3%", zIndex: 1 }}
      className="p-3 w-full py-5 sticky overflow-auto gap-[7px] bg-white no-scrollbar scroll-smooth"
      ref={parentContainer}
    >
      <div
        onClick={() => {
          setType("all");
          handleCategoryChange("all");
        }}
        className={`cursor-pointer border-[#BDC7D5]  px-3 flex-0 flex-shrink-0  rounded-[160px] border ${
          type === "all" ? "bg-[#FCE8EA] border-[#DD524C] " : "border-[#E4E4E4] hover:border-primary"
        }     `}
        {...(type === "all" && { ref: currentCategoryElement })}
      >
        <p className=" mt-3 px-3" style={{ color: type === "all" ? "#DA291C" : "#373A36" }}>
          All
        </p>
      </div>
      {contentCategories?.data?.map((data: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            setType(data?.slug);
            handleCategoryChange(data?.slug);
          }}
          className={`cursor-pointer px-3  flex-0 flex-shrink-0 h-[40px]  rounded-[160px] border border-[#BDC7D5] ${
            type === data.slug ? "bg-[#FCE8EA] border-[#DD524C]" : "border-[#E4E4E4] hover:border-primary"
          }`}
          {...(type === data.slug && { ref: currentCategoryElement })}
        >
          <div className="w-auto font-[500] text-[16px] flex space-between items-center mt-3 px-3">
            {data?.icon_url && (
              <img
                src={data?.icon_url}
                className={`w-[20px] mr-[10px] h-[20px] inline-block ${
                  type === data.slug ? "text-blue-500" : "text-green-200"
                }`}
                alt="Category Icon"
              />
            )}
            <p style={{ color: type === data.slug ? "#DA291C" : "#373A36" }}>{data.name}</p>
          </div>
        </div>
      ))}
    </Flex>
  );
};

export default ComponentsSidebar;
