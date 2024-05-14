import MainPageLayout from "@/components/userLayout/MainPageLayout";
import AppointmentAccept from "@/page-containers/user/mentorship/appointments/AppointmentAccept";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <AppointmentAccept />
    </MainPageLayout>
  );
};

export default MentorshipPage;
