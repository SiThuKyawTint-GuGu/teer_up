import MainPageLayout from "@/components/userLayout/MainPageLayout";
import CreateEducation from "@/page-containers/user/profile/CreateEducation";
import { NextPage } from "next";

const EducationCreatePage: NextPage = () => {
  return (
    <MainPageLayout>
      <CreateEducation />
    </MainPageLayout>
  );
};

export default EducationCreatePage;
