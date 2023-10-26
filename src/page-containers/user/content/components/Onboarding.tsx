import CardBox from "@/components/ui/Card";
import { Text } from "@/components/ui/Typo/Text";
import { usePostOnboarding } from "@/services/content";
import { ContentData, OnBoardingOption } from "@/types/Content";
import { cn } from "@/utils/cn";
import React, { useState } from "react";
import QuestionPageCard from "../../personalized/components/QuestionPageCard";
type OnboardingProps = {
  data: ContentData;
};
const Onboarding: React.FC<OnboardingProps> = ({ data }) => {
  const [option, setOption] = useState<OnBoardingOption | null>(null);
  const { trigger } = usePostOnboarding();

  return (
    <QuestionPageCard>
      <div className="w-full h-full">
        <CardBox className="flex flex-col flex-wrap px-3  justify-between  w-full h-[80vh] bg-white">
          <div className="text-gray-500 my-4 text-center">
            <Text className="text-[28px] font-[700]  text-center mb-5" as="div">
              {data.name}
            </Text>
            {option && (
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: option.feedback,
                  }}
                />
              </div>
            )}
            <div className="w-full cursor-pointer  flex flex-col flex-wrap gap-y-10 justify-center h-full items-center">
              {data.options &&
                data.options.length &&
                data.options.map((q: OnBoardingOption, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      setOption(q);
                      trigger(
                        {
                          option_id: q.id,
                          question_id: data.id,
                        },
                        {
                          onSuccess: () => {
                            setOption(q);
                          },
                        }
                      );
                    }}
                    className={cn(
                      `w-full border-[1px] border-slateGray p-2 rounded-xl text-center ${
                        option && option.id === q.id && "bg-secondary border-[1px] border-primary"
                      }`
                    )}
                  >
                    {q.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="text-center w-full pb-3">
            Tips: Choose the answer that best describes you currently.
          </div>
        </CardBox>
        <div className="py-4 text-center font-[300] w-full">Swipe up for more</div>
      </div>
    </QuestionPageCard>
  );
};

export default Onboarding;
