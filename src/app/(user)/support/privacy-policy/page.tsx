import MainPageLayout from "@/components/userLayout/MainPageLayout";
import PrivacyPolicy from "@/page-containers/support/PrivacyPolicy";
import { NextPage } from "next";

const PrivacyPolicyPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader hideFooter>
      <PrivacyPolicy />;
    </MainPageLayout>
  );
};

export default PrivacyPolicyPage;
