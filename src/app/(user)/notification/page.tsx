import MainPageLayout from "@/components/userLayout/MainPageLayout";
import NotificationPage from "@/page-containers/user/notification";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  return (
    <MainPageLayout hideHeader={false}>
      <NotificationPage />
    </MainPageLayout>
  );
};

export default Notifications;
