"use client";

import { Button } from "@/components/ui/Button";
import { useGetOnboardingQuestions, useSkipOnboarding } from "@/services/content";
import { ContentData } from "@/types/Content";
import { getLocalStorage } from "@/utils";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

import { useEffect, useTransition } from "react";
import ContentStart from "../../content/components/ContentStart";
import Onboarding from "../../content/components/Onboarding";

const OnboardingQuestionPage = () => {
  const token = getToken();
  const { data: onboardingArray } = useGetOnboardingQuestions({
    page: 1,
    pagesize: 25,
  });

  const showStart = getLocalStorage("content");
  const { trigger: skipOnboarding } = useSkipOnboarding();
  const [ispending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/profile");
  }, []);
  useEffect(() => {
    if (onboardingArray?.total === 0) {
      startTransition(() => router.push("/profile"));
    }
  }, [onboardingArray, router]);
  return (
    <div className="w-full h-[calc(100dvh-112px)] pt-[15px] pb-[10px]">
      <div
        className={`snap-y flex-col snap-mandatory h-full px-[16px]  w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
        style={{ scrollSnapStop: "always" }}
      >
        {showStart === 0 && token && <ContentStart />}
        {onboardingArray?.data.map((data: ContentData, index: number) => (
          <div
            className="w-full h-full snap-start"
            style={{ scrollSnapStop: "always" }}
            id={index.toString()}
            key={index}
          >
            <Onboarding data={data} parentIndex={index.toString()} mutate total={onboardingArray.total} />

            <Button
              variant="link"
              disabled={ispending}
              className="text-center w-full py-4 text-primary"
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
              Skip
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingQuestionPage;
