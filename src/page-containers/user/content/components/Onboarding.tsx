import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Typo/Text";
import { usePostOnboarding } from "@/services/content";
import { ContentData, OnBoardingOption } from "@/types/Content";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
type OnboardingProps = {
  data: ContentData;
  parentIndex: string;
  mutate: any;
};
const Onboarding: React.FC<OnboardingProps> = ({ data, parentIndex }) => {
  const [option, setOption] = useState<OnBoardingOption | null>(null);
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const { trigger, isMutating, data: returnData } = usePostOnboarding();
  const complete = returnData?.data.status.completed;

  const [imageLoading, setImageLoading] = useState(false);
  const router = useRouter();
  console.log("q", complete);
  return (
    <CardBox className="w-full h-[80%] bg-white">
      <div className="w-full h-full">
        <div className="flex flex-col flex-wrap px-3  justify-between overflow-y-auto no-scrollbar  w-full h-full">
          <div className="text-gray-500 my-4 text-center">
            <Text className="text-[20px] font-[700]  text-center mb-5" as="div">
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
        </div>
      </div>
      {modalOpen && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="w-full max-w-[400px] min-w-[200px] p-5 z-[9999999] bg-white rounded-md">
            {option?.feedback && (
              <>
                {imageLoading ? (
                  <Spinner className="w-full" color="#DA291C" width={35} height={35} />
                ) : (
                  <div className="w-full">
                    <div
                      className="text-center w-full"
                      dangerouslySetInnerHTML={{
                        __html: option.feedback,
                      }}
                      onLoad={() => {
                        setImageLoading(true); // Set imageLoading to false when the image has loaded
                      }}
                    />
                    <Button
                      className="w-full mt-5 p-2"
                      size="sm"
                      onClick={() => {
                        trigger(
                          {
                            option_id: option.id,
                            question_id: data.id,
                          },
                          {
                            onSuccess: () => {
                              setOpenModal(false);
                              if (complete) {
                                router.push("/profile");
                              }
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
                  </div>
                )}
              </>
            )}
          </div>
        </Modal>
      )}
    </CardBox>
  );
};

export default Onboarding;
