"use client";
import { ReactNode } from "react";

import SchoolDashboardLayout from "@/components/layout/schoolLayout";
import { getToken } from "@/utils/auth";
import { usePathname } from "next/navigation";
import ThemeRegistry from "./ThemeRegistry";

interface Props {
  children: ReactNode;
}

const SchoolLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const token = getToken();

  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <SchoolDashboardLayout>{children}</SchoolDashboardLayout>
    </ThemeRegistry>
  );
};

export default SchoolLayout;
