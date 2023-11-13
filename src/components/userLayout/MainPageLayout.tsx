import React from "react";

import { cn } from "@/utils/cn";
import BottomNavbar from "./BottomNavbar";
import Header from "./Header";

type MainPageLayoutProp = {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
};
const MainPageLayout: React.FC<MainPageLayoutProp> = ({ children, hideHeader, hideFooter }) => {
  return (
    <>
      {!hideHeader && <Header />}
      <div className={cn("h-full", !hideHeader ? "pt-[48px] pb-[64px]" : "pb-[64px]")}>{children}</div>
      {!hideFooter && <BottomNavbar />}
    </>
  );
};

export default MainPageLayout;
