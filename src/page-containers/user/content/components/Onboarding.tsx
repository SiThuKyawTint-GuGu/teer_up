import { Button } from "@/components/ui/Button";
import CardBox from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Typo/Text";
import { usePostOnboarding } from "@/services/content";
import { ContentData, OnBoardingOption } from "@/types/Content";
import { cn } from "@/utils/cn";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
type OnboardingProps = {
  data: ContentData;
  parentIndex: string;
  mutate: any;
  total?: number;
};
const Onboarding: React.FC<OnboardingProps> = ({ data, parentIndex, total }) => {
  const [option, setOption] = useState<OnBoardingOption | null>(null);
  const [modalOpen, setOpenModal] = useState<boolean>(false);
  const { trigger, isMutating } = usePostOnboarding();

  const [imageLoading, setImageLoading] = useState(false);
  const router = useRouter();

  return (
    <Flex align="center">
      <CardBox className="w-full h-full bg-white space-y-2" p="4">
        <Text className="text-center font-semibold text-xl mb-4" as="p">
          {data.name}
        </Text>
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
              {q.name}
            </div>
          ))}
        {modalOpen && (
          <Modal
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <div className="w-full max-w-[380px] min-w-[200px] p-5 z-[99999999] bg-white rounded-md">
              {option?.feedback && (
                <>
                  {imageLoading ? (
                    <Spinner className="w-full" color="#DA291C" width={35} height={35} />
                  ) : (
                    <div className="w-full h-[60dvh] overflow-y-scroll no-scrollbar">
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

                                if (total) {
                                  if (parseInt(parentIndex) === total) {
                                    router.push("/profile");
                                  }
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
    </Flex>
  );
};

export default Onboarding;
