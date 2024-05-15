import MainPageLayout from "@/components/userLayout/MainPageLayout";
import MentorshipHome from "@/page-containers/user/mentorship/mentorship-home/MentorshipHome";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <MentorshipHome/>
    </MainPageLayout>
  );
};

export default MentorshipPage;
