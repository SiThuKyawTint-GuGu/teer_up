import MainPageLayout from "@/components/userLayout/MainPageLayout";
import UnfinishedPathway from "@/page-containers/user/saved/UnfinishedPathway";
import { NextPage } from "next";

const UnfinishedPathwayPage: NextPage = () => {
  return (
    <MainPageLayout>
      <UnfinishedPathway />
    </MainPageLayout>
  );
};

export default UnfinishedPathwayPage;
