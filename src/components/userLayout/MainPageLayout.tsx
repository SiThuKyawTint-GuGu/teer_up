import React from "react";

import Header from "./Header";

type MainPageLayoutProp = {
  children: React.ReactNode;
  hideHeader?: boolean;
};
const MainPageLayout: React.FC<MainPageLayoutProp> = ({ children, hideHeader }) => {
  return (
    <>
      {!hideHeader && <Header />}
      <div className="h-full">{children}</div>
    </>
  );
};

export default MainPageLayout;
