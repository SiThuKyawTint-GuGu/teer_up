import MainPageLayout from "@/components/userLayout/MainPageLayout";
import CareerInterests from "@/page-containers/user/profile/CareerInterests";
import { NextPage } from "next";

const CareerInterestsPage: NextPage = () => {
  return (
    <MainPageLayout>
      <CareerInterests />
    </MainPageLayout>
  );
};

export default CareerInterestsPage;
