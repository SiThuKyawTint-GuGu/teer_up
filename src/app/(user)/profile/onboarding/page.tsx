import MainPageLayout from "@/components/userLayout/MainPageLayout";
import OnboardingQuestionPage from "@/page-containers/user/profile/onboarding";
import { NextPage } from "next";

const OnboardingPage: NextPage = () => {
  return (
    <MainPageLayout>
      <OnboardingQuestionPage />
    </MainPageLayout>
  );
};

export default OnboardingPage;
