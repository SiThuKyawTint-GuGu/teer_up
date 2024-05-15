import MainPageLayout from "@/components/userLayout/MainPageLayout";
import MyMentees from "@/page-containers/user/mentorship/my-mentees/MyMentees";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <MyMentees />
    </MainPageLayout>
  );
};

export default MentorshipPage;
