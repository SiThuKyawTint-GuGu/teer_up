"use client";
import { ReactNode } from "react";

import PageLayout from "@/components/layout";
import { getToken } from "@/utils/auth";
import { usePathname } from "next/navigation";
import ThemeRegistry from "./ThemeRegistry";

interface Props {
  children: ReactNode;
}

const SchoolLayout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <ThemeRegistry options={{ key: "mui" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "400px" }}>
          {" "}
          {/* This is the sidebar */}
          {/* Sidebar content goes here */}
        </div>
        <main className="bg-white w-full p-0 " id="main-content">
          <div style={{ height: "auto", marginBottom: "60px" }}>
            {/* Header */}
            <div
              style={{
                width: "100%",
                height: "110px",
              }}
            ></div>
            {children}
          </div>
        </main>
      </div>
    </ThemeRegistry>
  );
};

export default SchoolLayout;
