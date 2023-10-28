import MainPageLayout from "@/components/userLayout/MainPageLayout";
import RequestMentorship from "@/page-containers/user/mentorship/RequestMentorship";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <RequestMentorship />
    </MainPageLayout>
  );
};

export default MentorshipPage;
