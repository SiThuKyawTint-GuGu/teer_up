"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typo/Text";
import { useGetIndustry, useUpdateUserIndustry } from "@/services/industry";
import { IndustryData, IndustryResponse } from "@/types/Industry";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import QuestionPageCard from "../components/QuestionPageCard";
const IndustryPage = () => {
  const router = useRouter();
  const { trigger } = useUpdateUserIndustry();
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useGetIndustry<IndustryResponse>();
  console.log(data);

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

  console.log(selectData);

  const publicIndustry = useMemo(() => data?.data.published, [data]);
  const unpublicIndustry = useMemo(() => data?.data.unpublished, [data]);
  console.log(publicIndustry);

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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full">
          <QuestionPageCard
            nextPage="/department"
            title="Which industry are you most interested in?"
            layout
            subTitle="Pick 1 or more industry"
          >
            <Flex direction="column" className=" w-full h-full overflow-y-auto gap-y-3">
              <div className="grid grid-cols-2 gap-3  no-scrollbar  grid-flow-row">
                {publicIndustry &&
                  publicIndustry.length > 0 &&
                  publicIndustry.map((each: IndustryData, index: number) => (
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
                      <Text>{each.name}</Text>
                    </div>
                  ))}
              </div>

              <Text className="font-bold text-[18px]">Coming Soon</Text>
              <div className="grid grid-cols-2 gap-3   no-scrollbar  grid-flow-row">
                {unpublicIndustry &&
                  unpublicIndustry.length > 0 &&
                  unpublicIndustry.map((each: IndustryData, index: number) => (
                    <div
                      key={index}
                      className={`flex justify-center items-center w-full h-[104px]  overflow-hidden p-3 border-[1px]
                 shadow-md bg-[#fefefe] rounded-md cursor-pointer text-center`}
                    >
                      <Text className="text-slateGray">{each.name}</Text>
                    </div>
                  ))}
              </div>
            </Flex>
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
    </>
  );
};

export default IndustryPage;
