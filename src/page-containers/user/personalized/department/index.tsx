"use client";

import { Button } from "@/components/ui/Button";
import { useGetDepartment, useUpdateUserDepartment } from "@/services/department";
import { DepartmentResponse } from "@/types/Department";
import { IndustryData } from "@/types/Industry";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import QuestionPageCard from "../components/QuestionPageCard";
const DepartmentPage = () => {
  const router = useRouter();
  const { trigger } = useUpdateUserDepartment();
  const [isPending, startTransition] = useTransition();
  const { data } = useGetDepartment<DepartmentResponse>();
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
        departments: selectData,
      },
      {
        onSuccess: () => {
          startTransition(() => router.push("/home"));
        },
      }
    );
  };

  return (
    <QuestionPageCard
      nextPage="/home"
      title="Which industry are you most interested in?"
      layout
      subTitle="select one or more industry"
    >
      <div className="grid grid-cols-2 gap-7  grid-flow-row">
        {industry &&
          industry.length > 0 &&
          industry.map((each: IndustryData, index: number) => (
            <div
              key={index}
              onClick={() => {
                onChange(each.id);
              }}
              className={`flex justify-center items-center w-full h-full p-[24px] border-[1px]
                 shadow-md bg-[#fefefe] rounded-md cursor-pointer
             ${selectData.find(data => data === each.id) && "border-[1px] border-primary bg-secondary"}
        
            `}
            >
              {each.name}
            </div>
          ))}
      </div>
      <div className="fixed bottom-0 w-full max-w-[400px] mx-auto py-2 bg-white">
        <Button className="w-full" disabled={selectData.length == 0 || isPending} onClick={submitHandler} size="sm">
          Next
        </Button>
      </div>
    </QuestionPageCard>
  );
};

export default DepartmentPage;
