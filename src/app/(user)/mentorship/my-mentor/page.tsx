import MainPageLayout from "@/components/userLayout/MainPageLayout";
import MyMentor from "@/page-containers/user/mentorship/my-mentor/MyMentor";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <MyMentor />
    </MainPageLayout>
  );
};

export default MentorshipPage;
