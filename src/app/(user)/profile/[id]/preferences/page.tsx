import MainPageLayout from "@/components/userLayout/MainPageLayout";
import Preferences from "@/page-containers/user/profile/Preferences";
import { NextPage } from "next";

const CareerInterestsPage: NextPage = () => {
  return (
    <MainPageLayout>
      <Preferences />
    </MainPageLayout>
  );
};

export default CareerInterestsPage;
