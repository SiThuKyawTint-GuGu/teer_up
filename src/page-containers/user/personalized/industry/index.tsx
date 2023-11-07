"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/Button";
import { useGetIndustry, useUpdateUserIndustry } from "@/services/industry";
import { IndustryData, IndustryResponse } from "@/types/Industry";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import QuestionPageCard from "../components/QuestionPageCard";
const IndustryPage = () => {
  const router = useRouter();
  const { trigger } = useUpdateUserIndustry();
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useGetIndustry<IndustryResponse>();
  const [selectData, setSelectData] = useState<number[]>([]);
  const onChange = (data: number) => {
    const sameId = selectData.find(e => e === data);
    if (sameId) {
      setSelectData(prev => prev.filter(e => e !== data));
      return;
    }
    setSelectData(prev => {
      return [...prev, data];
    });
  };
  const industry = useMemo(() => data?.data, [data]);

  const submitHandler = () => {
    trigger(
      {
        industries: selectData,
      },
      {
        onSuccess: () => {
          startTransition(() => router.push("/department"));
        },
      }
    );
  };

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-full">
          <QuestionPageCard
            nextPage="/department"
            title="Which industry are you most interested in?"
            layout
            subTitle="select one or more industry"
          >
            <div className="grid grid-cols-2 gap-3 overflow-y-scroll h-full grid-flow-row">
              {industry &&
                industry.length > 0 &&
                industry.map((each: IndustryData, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      onChange(each.id);
                    }}
                    className={`flex justify-center items-center w-full h-[104px] overflow-hidden p-3 border-[1px]
                 shadow-md bg-[#fefefe] rounded-md cursor-pointer text-center
             ${selectData.find(data => data === each.id) && "border-[1px] border-primary bg-secondary"}
        
            `}
                  >
                    {each.name}
                  </div>
                ))}
            </div>
          </QuestionPageCard>
          <div className="fixed bottom-0 w-full max-w-[400px] py-2 px-4 mx-auto  bg-white">
            <Button
              className="w-full"
              disabled={selectData.length == 0 || isPending}
              loading={isPending}
              onClick={submitHandler}
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryPage;
