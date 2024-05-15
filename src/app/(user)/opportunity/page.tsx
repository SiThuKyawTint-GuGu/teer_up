import MainPageLayout from "@/components/userLayout/MainPageLayout";
import ReviewInformation from "@/page-containers/user/opportunity/ReviewInformation";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  return (
    <MainPageLayout hideHeader={true}>
      <ReviewInformation />
    </MainPageLayout>
  );
};

export default Notifications;
