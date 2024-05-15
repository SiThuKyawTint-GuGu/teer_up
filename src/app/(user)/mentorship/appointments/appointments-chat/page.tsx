import MainPageLayout from "@/components/userLayout/MainPageLayout";
import AppointmentChat from "@/page-containers/user/mentorship/appointments/AppointmentChat";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <AppointmentChat />
    </MainPageLayout>
  );
};

export default MentorshipPage;
