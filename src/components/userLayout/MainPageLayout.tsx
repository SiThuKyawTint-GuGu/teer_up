import React from "react";

import { cn } from "@/utils/cn";
import BottomNavbar from "./BottomNavbar";
import Header from "./Header";

type MainPageLayoutProp = {
  children: React.ReactNode;
  hideHeader?: boolean;
};
const MainPageLayout: React.FC<MainPageLayoutProp> = ({ children, hideHeader }) => {
  return (
    <>
      {!hideHeader && <Header />}
      <div className={cn("h-full", !hideHeader ? "py-[48px]" : "pb-[48px]")}>{children}</div>
      <BottomNavbar />
    </>
  );
};

export default MainPageLayout;
