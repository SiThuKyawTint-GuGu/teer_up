import MainPageLayout from "@/components/userLayout/MainPageLayout";
import UserContent from "@/page-containers/user/content";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <UserContent />
    </MainPageLayout>
  );
};

export default MentorshipPage;
