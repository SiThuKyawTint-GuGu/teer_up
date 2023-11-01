"use client";

import { Button } from "@/components/ui/Button";
import { useGetIndustry } from "@/services/industry";
import { IndustryData, IndustryResponse } from "@/types/Industry";
import { useState } from "react";
import QuestionPageCard from "../components/QuestionPageCard";
const IndustryPage = () => {
  const { data } = useGetIndustry<IndustryResponse>();

  const industry = data?.data;

  const [selectData, setSelectData] = useState("");

  return (
    <QuestionPageCard title="Which industry are you most interested in?" layout subTitle="select one or more industry">
      <div className="grid grid-cols-2 gap-7  grid-flow-row">
        {industry &&
          industry.length > 0 &&
          industry.map((each: IndustryData, index: number) => (
            <div
              key={index}
              onClick={() => setSelectData(each.name)}
              className={`flex justify-center items-center w-full h-full p-[24px] border-[1px]
            shadow-md bg-[#fefefe] rounded-md 
             ${selectData === each.name && "border-[1px] border-primary bg-secondary"}
        
            `}
            >
              {each.name}
            </div>
          ))}
      </div>
      <div className="fixed bottom-0 w-full max-w-[400px] mx-auto py-2 bg-white">
        <Button className="w-full" size="sm">
          Next
        </Button>
      </div>
    </QuestionPageCard>
  );
};

export default IndustryPage;
