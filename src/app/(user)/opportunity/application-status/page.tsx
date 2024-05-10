import MainPageLayout from "@/components/userLayout/MainPageLayout";
import ApplicationStatus from "@/page-containers/user/opportunity/ApplicationStatus";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  return (
    <MainPageLayout hideHeader={true}>
      <ApplicationStatus />
    </MainPageLayout>
  );
};

export default Notifications;
