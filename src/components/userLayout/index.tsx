"use client";
import React from "react";

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto">
      <div className="bg-[#F8F9FB]  w-full h-full">{children}</div>
      {/* <div className="w-full h-full flex justify-center items-center">
        <div className=" max-w-[390px] min-h-screen  p-3  no-scrollbar">
          <div className="w-full max-h-[850px] h-full bg-white relative"></div>
        </div>
      </div> */}
    </div>
  );
};

export default UserPageLayout;
