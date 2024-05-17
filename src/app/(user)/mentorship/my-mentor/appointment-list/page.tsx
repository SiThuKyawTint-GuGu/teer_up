import MainPageLayout from "@/components/userLayout/MainPageLayout";
import AppointmentList from "@/page-containers/user/mentorship/my-mentor/AppointmentList";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <AppointmentList />
    </MainPageLayout>
  );
};

export default MentorshipPage;
