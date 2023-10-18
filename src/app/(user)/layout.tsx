import BottomNavbar from "@/components/userLayout/BottomNavbar";
import Header from "@/components/userLayout/Header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" max-w-[390px] max-h-[844px] p-3 relative no-scrollbar">
        <Header />
        <div className="w-full bg-[#F8F9FB] max-h-[80%] overflow-hidden">{children}</div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default UserLayout;
