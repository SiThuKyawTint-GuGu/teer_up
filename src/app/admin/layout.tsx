"use client";
import { ReactNode } from "react";

import PageLayout from "@/components/layout";
import { getToken } from "@/utils/auth";
import { usePathname } from "next/navigation";
import ThemeRegistry from "./ThemeRegistry";
import { Toaster } from "react-hot-toast";
import "./styles.css";

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
          <main className="bg-white w-full p-0" id="main-content">
            <div style={{ height: "auto", marginBottom: "60px" }}>{children}</div>
          </main>
        </PageLayout>
      ) : (
        <main className="bg-white w-full p-0 " id="main-content">
          <div style={{ height: "auto", marginBottom: "60px" }}>{children}</div>
        </main>
      )}
      <Toaster />
    </ThemeRegistry>
  );
};

export default AdminLayout;
