import React from "react";

import BottomNavbar from "./BottomNavbar";
import Header from "./Header";

type MainPageLayoutProp = {
  children: React.ReactNode;
};
const MainPageLayout: React.FC<MainPageLayoutProp> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <BottomNavbar />
    </>
  );
};

export default MainPageLayout;
