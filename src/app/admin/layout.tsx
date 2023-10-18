"use client";
import { ReactNode } from "react";

import PageLayout from "@/components/layout";
import { getToken } from "@/utils/auth";
import { usePathname } from "next/navigation";
import ThemeRegistry from "./ThemeRegistry";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const token = getToken();

  return (
    <ThemeRegistry options={{ key: "mui" }}>
      {token ? (
        <PageLayout>
          <main className="bg-gray-100 h-full p-[10px]">{children}</main>
        </PageLayout>
      ) : (
        <main className="bg-gray-100 h-full p-[10px]">{children}</main>
      )}
    </ThemeRegistry>
  );
};

export default AdminLayout;
