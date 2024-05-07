import MainPageLayout from "@/components/userLayout/MainPageLayout";
import ContentHistoryPage from "@/page-containers/user/content-history";
import { NextPage } from "next";

export const metadata = {
  title: "Content History",
  description: "Content History Page",
};

const ContentHistory: NextPage = () => {
  return (
    <MainPageLayout>
      <ContentHistoryPage />
    </MainPageLayout>
  );
};

export default ContentHistory;
