import MainPageLayout from "@/components/userLayout/MainPageLayout";
import UserContent from "@/page-containers/user/content";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <MainPageLayout hideHeader>
      <UserContent />
    </MainPageLayout>
  );
};

export default Home;
