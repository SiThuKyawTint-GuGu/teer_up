import MainPageLayout from "@/components/userLayout/MainPageLayout";
import EditEducation from "@/page-containers/user/profile/EditEducation";
import { NextPage } from "next";

const EducationEditPage: NextPage = () => {
  return (
    <MainPageLayout>
      <EditEducation />
    </MainPageLayout>
  );
};

export default EducationEditPage;
