"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { useWindowSize } from "@/hooks/useWindowSize";
import Login from "@/page-containers/admin/auth/login";

import AdminLayout from "./adminLayout";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { windowWidth } = useWindowSize();
  const pathname = usePathname();

  if (pathname === "/admin/auth/login") {
    return <Login />;
  }
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
    // <div className="flex justify-start items-start">
    //   {windowWidth > WINDOW_WIDTH.LG ? (
    //     <div className="fixed top-0 left-0">
    //       <Sidebar />
    //     </div>
    //   ) : (
    //     <div className="fixed w-full flex justify-end z-10">
    //       <HamburgerDrawer className="lg:hidden w-[45px]">
    //         <Sidebar />
    //       </HamburgerDrawer>
    //     </div>
    //   )}
    //   <div className="w-full min-h-screen lg:ml-[260px] bg-primary-light dark:bg-primary-dark px-4">
    //     <Header />
    //     <div>{children}</div>
    //   </div>
    // </div>
  );
};

export default PageLayout;
