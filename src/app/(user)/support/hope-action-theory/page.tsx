import MainPageLayout from "@/components/userLayout/MainPageLayout";
import HopeActionTheory from "@/page-containers/support/HopeActionTheory";
import { NextPage } from "next";

const HopeActionTheoryPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader hideFooter>
      <HopeActionTheory />;
    </MainPageLayout>
  );
};

export default HopeActionTheoryPage;
