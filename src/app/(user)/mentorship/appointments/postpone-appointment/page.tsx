import MainPageLayout from "@/components/userLayout/MainPageLayout";
import PostponeAppointment from "@/page-containers/user/mentorship/appointments/PostponeAppointment";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <PostponeAppointment />
    </MainPageLayout>
  );
};

export default MentorshipPage;
