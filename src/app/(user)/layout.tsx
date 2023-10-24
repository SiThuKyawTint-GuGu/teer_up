import { ReactNode } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" max-w-[390px] min-h-screen  p-3  no-scrollbar">
        <div className="w-full max-h-[850px] h-full bg-white relative">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
