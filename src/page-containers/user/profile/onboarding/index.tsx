"use client";

import { Button } from "@/components/ui/Button";
import { useGetOnboardingQuestions, useSkipOnboarding } from "@/services/content";
import { ContentData } from "@/types/Content";
import { getLocalStorage } from "@/utils";
import { useRouter } from "next/navigation";

import { useEffect, useState, useTransition } from "react";
import ContentStart from "../../content/components/ContentStart";
import Onboarding from "../../content/components/Onboarding";
import SecondStartPage from "../../content/components/SecondStartPage";

const OnboardingQuestionPage = () => {
  const [showStart, setShowStart] = useState<boolean>(false);
  const { data: onboardingArray } = useGetOnboardingQuestions({
    page: 1,
    pagesize: 25,
  });
  const show = getLocalStorage("content");
  useEffect(() => {
    if (show === "0") {
      setShowStart(false);
      return;
    }
    setShowStart(true);
  }, [show]);

  console.log(showStart);
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

  return (
    <div className="w-full h-[calc(100dvh-96px)]">
      {showStart ? (
        <ContentStart setShow={setShowStart} />
      ) : (
        <div
          className={`snap-y flex-col snap-mandatory h-full px-[16px]  w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
          style={{ scrollSnapStop: "always" }}
        >
          <SecondStartPage />
          {onboardingArray?.data.map((data: ContentData, index: number) => (
            <div
              className="w-full h-full snap-start"
              style={{ scrollSnapStop: "always" }}
              id={index.toString()}
              key={index}
            >
              <Onboarding data={data} parentIndex={index.toString()} mutate total={onboardingArray?.data.length - 1} />

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
      )}
    </div>
  );
};

export default OnboardingQuestionPage;
