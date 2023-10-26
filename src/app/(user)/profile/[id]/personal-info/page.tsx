import MainPageLayout from "@/components/userLayout/MainPageLayout";
import PersonalInfo from "@/page-containers/user/profile/PersonalInfo";
import { NextPage } from "next";

const PersonalInfoPage: NextPage = () => {
  return (
    <MainPageLayout>
      <PersonalInfo />
    </MainPageLayout>
  );
};

export default PersonalInfoPage;
