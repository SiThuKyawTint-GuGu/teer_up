import MainPageLayout from "@/components/userLayout/MainPageLayout";
import AdditionalQuestions from "@/page-containers/user/opportunity/AdditionalQuestions";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  return (
    <MainPageLayout hideHeader={true}>
      <AdditionalQuestions />
    </MainPageLayout>
  );
};

export default Notifications;
