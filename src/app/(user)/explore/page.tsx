import MainPageLayout from "@/components/userLayout/MainPageLayout";
import UserContent from "@/page-containers/user/content";
import { NextPage } from "next";
export const metadata = {
  title: "Explore",
  openGraph: {
    title: "Explore",
  },
};
const Explore: NextPage = () => {
  return (
    <MainPageLayout>
      <UserContent />
    </MainPageLayout>
  );
};

export default Explore;
