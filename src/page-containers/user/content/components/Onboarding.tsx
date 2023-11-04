import { Button } from "@/components/ui/Button";
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
  parentIndex: string;
};
const Onboarding: React.FC<OnboardingProps> = ({ data, parentIndex }) => {
  const [option, setOption] = useState<OnBoardingOption | null>(null);
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const { trigger, isMutating } = usePostOnboarding();

  return (
    <QuestionPageCard>
      <div className="w-full h-[90%]">
        <CardBox className="flex flex-col flex-wrap px-3  justify-between overflow-y-auto no-scrollbar  w-full h-[90%] bg-white">
          <div className="text-gray-500 my-4 text-center">
            <Text className="text-[28px] font-[700]  text-center mb-5" as="div">
              {data.name}
            </Text>

            <div className="w-full cursor-pointer  flex flex-col flex-wrap gap-y-2 justify-center h-full items-center">
              {data.options &&
                data.options.length &&
                data.options.map((q: OnBoardingOption, index: number) => (
                  <div
                    key={index}
                    onClick={e => {
                      e.preventDefault();
                      setOption(q);
                      setOpenModal(true);
                    }}
                    className={cn(
                      `w-full border-[1px] border-slateGray p-2 rounded-xl text-center ${
                        option && option.id === q.id && "bg-secondary border-[1px] border-primary"
                      }`
                    )}
                  >
                    <div>{q.name}</div>
                  </div>
                ))}
            </div>
          </div>
        </CardBox>
      </div>
      {modalOpen && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="w-full p-10 z-[9999999] bg-white rounded-md">
            {option && (
              <>
                <div
                  className="text-center w-full"
                  dangerouslySetInnerHTML={{
                    __html: option.feedback,
                  }}
                />
                <Button
                  className="w-full mt-5"
                  onClick={() => {
                    trigger(
                      {
                        option_id: option.id,
                        question_id: data.id,
                      },
                      {
                        onSuccess: () => {
                          setOpenModal(false);
                          const targetElement = document.getElementById(`${parseInt(parentIndex) + 1}`);
                          if (targetElement) {
                            targetElement.scrollIntoView({
                              behavior: "smooth", // Smooth scroll effect
                            });
                          }
                        },
                      }
                    );
                  }}
                  disabled={isMutating}
                >
                  Next
                </Button>
              </>
            )}
          </div>
        </Modal>
      )}
    </QuestionPageCard>
  );
};

export default Onboarding;
