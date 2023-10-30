import MainPageLayout from "@/components/userLayout/MainPageLayout";
import BrowsePage from "@/page-containers/user/browse";
import { NextPage } from "next";

const Browse: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <BrowsePage />
    </MainPageLayout>
  );
};

export default Browse;
