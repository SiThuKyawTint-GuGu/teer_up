import MainPageLayout from "@/components/userLayout/MainPageLayout";
import MentorshipEvents from "@/page-containers/user/mentorship/mentorship-events/MentorshipEvents";
import { NextPage } from "next";

const MentorshipEventPage: NextPage = () => {
  return (
    <MainPageLayout>
      <MentorshipEvents />
    </MainPageLayout>
  );
};

export default MentorshipEventPage;
