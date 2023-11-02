import CardBox from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
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
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const { trigger } = usePostOnboarding();

  return (
    <QuestionPageCard>
      <div className="w-full h-full">
        <CardBox className="flex flex-col flex-wrap px-3  justify-between overflow-y-auto no-scrollbar  w-full h-[80%] bg-white">
          <div className="text-gray-500 my-4 text-center">
            <Text className="text-[28px] font-[700]  text-center mb-5" as="div">
              {data.name}
            </Text>
            {/* {option && (
              <div className="text-center w-full">
                <div
                  dangerouslySetInnerHTML={{
                    __html: option.feedback,
                  }}
                />
              </div>
            )} */}
            <div className="w-full cursor-pointer  flex flex-col flex-wrap gap-y-5 justify-center h-full items-center">
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
                            setOpenModal(true);
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
        </CardBox>
      </div>
      {modalOpen && (
        <Modal onClose={() => setOpenModal(false)}>
          <div className="w-100 p-10">
            {option && (
              <div
                dangerouslySetInnerHTML={{
                  __html: option.feedback,
                }}
              />
            )}
          </div>
        </Modal>
      )}
    </QuestionPageCard>
  );
};

export default Onboarding;
