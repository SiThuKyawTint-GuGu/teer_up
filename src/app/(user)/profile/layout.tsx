import MainPageLayout from "@/components/userLayout/MainPageLayout";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainPageLayout hideHeader>{children}</MainPageLayout>;
};

export default ProfileLayout;
