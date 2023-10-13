import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return <div className="mx-auto p-3">{children}</div>;
};

export default UserLayout;
