import React from "react";
import {  Flex } from  "@radix-ui/themes";

interface Props {
  handleCategoryChange: () => void;
  type: string;
  contentCategories: any; 
  currentCategoryElement: React.RefObject<HTMLDivElement>;
  parentContainer: React.RefObject<HTMLDivElement>;
}

const ComponentsSidebar: React.FC<Props> = ({
  handleCategoryChange,
  type,
  contentCategories,
  currentCategoryElement,
  parentContainer,
}) => {
  return (
    <Flex
      style={{ top: "5.3%", zIndex: 1 }}
      className="p-3 w-full py-5 sticky overflow-auto gap-[7px] bg-white no-scrollbar scroll-smooth"
      ref={parentContainer}
    >
      <div
        onClick={() => {
          handleCategoryChange("all");
        }}
        className={`cursor-pointer border-[#BDC7D5]  px-3 flex-0 flex-shrink-0  rounded-[160px] border ${
          type == "all" ? "bg-[#FCE8EA] border-[#DD524C] " : "border-[#E4E4E4] hover:border-primary"
        }     `}
        {...(type === "all" && { ref: currentCategoryElement })}
      >
        <p className=" mt-3 px-3" style={{ color: type === "all" ? "#DA291C" : "#373A36" }}>
          All
        </p>
      </div>
      {contentCategories?.data?.map((data, index: number) => (
        <div
          key={index}
          onClick={() => {
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
