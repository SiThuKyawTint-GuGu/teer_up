import MainPageLayout from "@/components/userLayout/MainPageLayout";
import AppointmentDetails from "@/page-containers/user/mentorship/appointments/AppointmentDetails";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <AppointmentDetails/>
    </MainPageLayout>
  );
};

export default MentorshipPage;
