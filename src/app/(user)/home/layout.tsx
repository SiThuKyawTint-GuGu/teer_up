import UserPageLayout from "@/components/userLayout";
import { ReactNode } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <>
      <UserPageLayout>{children}</UserPageLayout>
    </>
  );
};

export default UserLayout;
