import BottomNavbar from "@/components/userLayout/BottomNavbar";
import Header from "@/components/userLayout/Header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[#e2e3e3]">
      <div className="max-w-[390px] min-h-screen p-3 relative no-scrollbar">
        <Header />
        <div className="w-full min-h-screen overflow-hidden">{children}</div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default UserLayout;
