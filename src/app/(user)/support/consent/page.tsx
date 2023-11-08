import MainPageLayout from "@/components/userLayout/MainPageLayout";
import Consent from "@/page-containers/support/Consent";
import { NextPage } from "next";

const ConsentPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader hideFooter>
      <Consent />
    </MainPageLayout>
  );
};

export default ConsentPage;
