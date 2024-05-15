"use client";

import { Button } from "@/components/ui/Button";
import { useGetOnboardingQuestions, useSkipOnboarding } from "@/services/content";
import { ContentData } from "@/types/Content";
import { getLocalStorage } from "@/utils";
import { useRouter } from "next/navigation";

import CircleProgress from "@/components/ui/CircleProgress";
import { Icons, Image } from "@/components/ui/Images";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Typo/Text";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { useEffect, useState, useTransition } from "react";
import ContentStart from "../../content/components/ContentStart";
import Onboarding from "../../content/components/Onboarding";
import SecondStartPage from "../../content/components/SecondStartPage";

const OnboardingQuestionPage = () => {
  const [showStart, setShowStart] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: onboardingArray } = useGetOnboardingQuestions({
    page: 1,
    pagesize: 25,
  });

  const show = getLocalStorage("content");
  useEffect(() => {
    if (show === "0") {
      setShowStart(false);
    } else {
      setShowStart(true);
    }
  }, [show]);

  const { trigger: skipOnboarding } = useSkipOnboarding();
  const [ispending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/profile");
  }, [router]);

  useEffect(() => {
    if (onboardingArray?.total === 0) {
      startTransition(() => router.push("/profile"));
    }
  }, [onboardingArray, router]);

  const totalOnboardQ = onboardingArray?.last_page * onboardingArray?.per_page;
  const passedOnboardQ = totalOnboardQ - onboardingArray?.total;

  return (
    <Flex direction="column" justify="center" position="relative" height="100%">
      <Grid
        columns="3"
        justify="between"
        align="center"
        p="2"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        className="bg-white"
      >
        <Flex justify="start">
          <Button onClick={() => router.back()} className="p-0" variant="ghost">
            <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
          </Button>
        </Flex>
        <Image src="/auth/teeUpLogo.png" width={84} height={20} alt="teeup logo" />
        {!showStart && (
          <Flex justify="end">
            <CircleProgress totalQuestions={totalOnboardQ} passedQuestions={passedOnboardQ} />
          </Flex>
        )}
      </Grid>
      <Box className="w-full h-full">
        <div
          className={`snap-y flex-col snap-mandatory h-full px-[16px] w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
          style={{ scrollSnapStop: "always" }}
        >
          <div className="w-full h-full snap-start">
            {showStart ? <ContentStart setShow={setShowStart} /> : <SecondStartPage />}
          </div>
          {onboardingArray?.data.map((data: ContentData, index: number) => (
            <div className="w-full h-full snap-start flex flex-col justify-center" id={index.toString()} key={index}>
              <Onboarding data={data} parentIndex={index.toString()} mutate total={onboardingArray?.data.length - 1} />

              <Button
                variant="link"
                disabled={ispending}
                className="text-center w-full py-4 mt-4 text-primary"
                onClick={() => {
                  setOpenModal(true);
                  // skipOnboarding(
                  //   {
                  //     skip: true,
                  //   },
                  //   {
                  //     onSuccess: () => {
                  //       startTransition(() => {
                  //         router.push("/profile");
                  //       });
                  //     },
                  //   }
                  // );
                }}
              >
                Skip
              </Button>
            </div>
          ))}
        </div>
        {openModal && (
          <Modal
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <div className="w-[380px] p-5 z-[99999999] bg-white rounded-md">
              <div className="w-full overflow-y-scroll no-scrollbar">
                <div className="text-center w-full">
                  <Text className="text-[20px] font-[700] text-center mb-5" as="div">
                    Skip This Step
                  </Text>
                  <p>Are you sure want to skip?</p>
                </div>
                <Flex gap="4">
                  <Button
                    className="w-full mt-5 p-2 px-4 text-primary"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full mt-5 p-2 px-4"
                    size="sm"
                    loading={ispending}
                    disabled={ispending}
                    onClick={() => {
                      skipOnboarding(
                        {
                          skip: true,
                        },
                        {
                          onSuccess: () => {
                            startTransition(() => {
                              router.push("/profile");
                            });
                          },
                        }
                      );
                    }}
                  >
                    Next
                  </Button>
                </Flex>
              </div>
            </div>
          </Modal>
        )}
      </Box>
    </Flex>
  );
};

export default OnboardingQuestionPage;
