"use client";

import { useGetOnboardingQuestions } from "@/services/content";
import { ContentData } from "@/types/Content";
import { getLocalStorage } from "@/utils";
import { getToken } from "@/utils/auth";
import ContentStart from "../../content/components/ContentStart";
import Onboarding from "../../content/components/Onboarding";

const OnboardingQuestionPage = () => {
  const token = getToken();
  const { data: onboardingArray } = useGetOnboardingQuestions({
    page: 1,
    pagesize: 25,
  });

  const showStart = getLocalStorage("content");

  return (
    <div className="w-full h-[calc(100dvh-96px)] pt-[6px]">
      <div
        className={`snap-y flex-col snap-mandatory h-full px-[16px]  w-full bg-[#F8F9FB] no-scrollbar overflow-y-scroll`}
        style={{ scrollSnapStop: "always" }}
      >
        {showStart === 0 && token && <ContentStart />}
        {onboardingArray?.data.map((data: ContentData, index: number) => (
          <div
            className="w-full h-full pt-2 snap-start"
            style={{ scrollSnapStop: "always" }}
            id={index.toString()}
            key={index}
          >
            <Onboarding data={data} parentIndex={index.toString()} />

            {index === 0 && <div className="py-4 text-center font-[300]">Swipe up for more</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingQuestionPage;
