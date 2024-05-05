import React from "react";

import { cn } from "@/utils/cn";
import Header from "./Header";

type MainPageLayoutProp = {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
};
const MainPageLayout: React.FC<MainPageLayoutProp> = ({ children, hideHeader }) => {
  return (
    <>
      {!hideHeader && <Header />}
      <div className={cn("h-full", !hideHeader ? "pt-[48px] pb-[64px]" : "pb-[64px]")}>{children}</div>
    </>
  );
};

export default MainPageLayout;
