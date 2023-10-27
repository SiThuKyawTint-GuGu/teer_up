import React from "react";

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
      {children}
      <BottomNavbar />
    </>
  );
};

export default MainPageLayout;
