import MainPageLayout from "@/components/userLayout/MainPageLayout";
import Profile from "@/page-containers/user/profile";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
  return (
    <MainPageLayout hideHeader={false}>
      <Profile />
    </MainPageLayout>
  );
};

export default ProfilePage;
