"use client";
import { ReactNode } from "react";

import SchoolDashboardLayout from "@/components/layout/schoolLayout";
import { getToken } from "@/utils/auth";
import { usePathname } from "next/navigation";
import ThemeRegistry from "./ThemeRegistry";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

const SchoolLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const token = getToken();

  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <SchoolDashboardLayout>{children}</SchoolDashboardLayout>
      <Toaster
        containerStyle={{
          top: 80,
          right: 20,
          width: "100%",
          position: "fixed",
          zIndex: 2,
        }}
      />
    </ThemeRegistry>
  );
};

export default SchoolLayout;
