import MainPageLayout from "@/components/userLayout/MainPageLayout";
import TermsUse from "@/page-containers/support/TermsUse";
import { NextPage } from "next";

const TermsUsePage: NextPage = () => {
  return (
    <MainPageLayout hideHeader hideFooter>
      <TermsUse />
    </MainPageLayout>
  );
};

export default TermsUsePage;
