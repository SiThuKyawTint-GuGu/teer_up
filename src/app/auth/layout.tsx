import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="bg-[#F8F9FB]">
      <div className="w-[500px] mx-auto">{children}</div>
    </main>
  );
};

export default AuthLayout;
