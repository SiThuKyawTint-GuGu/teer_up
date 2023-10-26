import MainPageLayout from "@/components/userLayout/MainPageLayout";
import ProfileEdit from "@/page-containers/user/profile/Edit";
import { NextPage } from "next";

const ProfileEditPage: NextPage = () => {
  return (
    <MainPageLayout>
      <ProfileEdit />
    </MainPageLayout>
  );
};

export default ProfileEditPage;
