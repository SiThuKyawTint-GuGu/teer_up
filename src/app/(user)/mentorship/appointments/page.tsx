import MainPageLayout from "@/components/userLayout/MainPageLayout";
import Appointments from "@/page-containers/user/mentorship/appointments/Appointments";
import { NextPage } from "next";

const MentorshipPage: NextPage = () => {
  return (
    <MainPageLayout>
      <Appointments />
    </MainPageLayout>
  );
};

export default MentorshipPage;
