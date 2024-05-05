import MainPageLayout from "@/components/userLayout/MainPageLayout";
import NotificationPage from "@/page-containers/about";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <NotificationPage />
    </MainPageLayout>
  );
};

export default Notifications;
