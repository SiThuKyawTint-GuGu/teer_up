import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" min-w-[390px] min-h-screen p-3  no-scrollbar">
        <div className="w-full bg-white relative overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
