import MainPageLayout from "@/components/userLayout/MainPageLayout";
import Education from "@/page-containers/user/profile/Education";
import { NextPage } from "next";

const EducationPage: NextPage = () => {
  return (
    <MainPageLayout>
      <Education />
    </MainPageLayout>
  );
};

export default EducationPage;
