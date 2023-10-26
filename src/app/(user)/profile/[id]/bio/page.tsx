import MainPageLayout from "@/components/userLayout/MainPageLayout";
import Bio from "@/page-containers/user/profile/Bio";
import { NextPage } from "next";

const BioPage: NextPage = () => {
  return (
    <MainPageLayout>
      <Bio />;
    </MainPageLayout>
  );
};

export default BioPage;
