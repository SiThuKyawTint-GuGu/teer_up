import MainPageLayout from "@/components/userLayout/MainPageLayout";
import AppointmentReject from "@/page-containers/user/mentorship/appointments/AppointmentReject";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <AppointmentReject />
    </MainPageLayout>
  );
};

export default MentorshipPage;
