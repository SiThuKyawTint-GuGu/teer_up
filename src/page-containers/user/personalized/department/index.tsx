"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typo/Text";
import { useGetDepartment, useGetDepartmentList, useUpdateUserDepartment } from "@/services/department";
import { DepartmentResponse } from "@/types/Department";
import { IndustryData } from "@/types/Industry";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import QuestionPageCard from "../components/QuestionPageCard";

const DepartmentPage = () => {
  const router = useRouter();
  const { trigger } = useUpdateUserDepartment();
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useGetDepartmentList<DepartmentResponse>();
  const [selectData, setSelectData] = useState<number[]>([]);

  useEffect(()=>{
  },[data])
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
  const industry = useMemo(() => data?.data?.published, [data]);

  const submitHandler = () => {
    console.log(selectData);
    trigger(
      {
        departments: selectData,
      },
      {
        onSuccess: () => {
          startTransition(() => router.push("/industry"));
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
            nextPage="/industry"
            title="Which Department are you most interested in??"
            layout
            subTitle="Pick 1 or more fields"
          >
            <div className="flex justify-between flex-wrap   no-scrollbar ">
              {industry &&
                industry.length > 0 &&
                industry.map((each: IndustryData, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      onChange(each.id);
                    }}
                    className="w-1/2 py-3 px-3"
                  >
                    <div
                      className={`flex justify-center relative items-center h-[104px]  p-3 border-[1px]
             shadow-md bg-[#fefefe] rounded-md cursor-pointer text-center
         ${selectData.find(data => data === each.id) && "border-[1px] border-primary bg-secondary "}
        `}
                    >
                      <div
                        className={`absolute right-0 top-0 translate-x-1/2 z-[100] translate-y-[-50%] ${
                          selectData.find(data => data === each.id) ? "block" : "hidden"
                        }`}
                      >
                        <Image src="/personalize/ActiveIcon.svg" width={24} height={24} alt="industry" />
                      </div>
                      <Text className="font-semibold text-[#373A36]">{each.name}</Text>
                    </div>
                  </div>
                ))}
            </div>
          </QuestionPageCard>
          <div className="fixed bottom-0 w-full max-w-[400px] mx-auto py-2 px-4 bg-white">
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

export default DepartmentPage;
