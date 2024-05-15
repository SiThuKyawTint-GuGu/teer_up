import MainPageLayout from "@/components/userLayout/MainPageLayout";
import ExploreMentors from "@/page-containers/user/mentorship/explore";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <ExploreMentors />
    </MainPageLayout>
  );
};

export default MentorshipPage;
