"use client";
import { ReactNode } from "react";

import CompanyDashboardLayout from "@/components/layout/companyLayout";
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
      <CompanyDashboardLayout>{children}</CompanyDashboardLayout>
    </ThemeRegistry>
  );
};

export default SchoolLayout;
