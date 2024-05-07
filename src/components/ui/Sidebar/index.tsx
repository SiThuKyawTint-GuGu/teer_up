"use client";

import BGImage from "@/components/shared/BGImage";
import { WIDTH_TYPES } from "@/components/shared/enums";
import { Image } from "@/components/ui/Images";
import { useGetUser } from "@/services/user";
import { navbarItems, NavbarType } from "@/shared/data/UserTabbar";
import { UserProfileResponse } from "@/types/Profile";
import { logout } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { mutate } from "swr";
import { Button } from "../Button";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const { data: profileData } = useGetUser<UserProfileResponse>();
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const userProfile = profileData?.data;

  const handleLogout = () => {
    logout();
    mutate(() => true, undefined, { revalidate: false });
    startTransition(() => {
      router.push("/");
    });
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const sidebar = document.getElementById("sidebar");
    if (openMenu && sidebar && !sidebar.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [openMenu]);

  return (
    <>
      <button className="hamburger-button" onClick={() => setOpenMenu(true)}>
        <Image src="/uploads/icons/hambuger.png" width={20} height={20} alt="hambuger menu" />
      </button>
      {openMenu && (
        <>
          <div className="absolute w-full h-screen bg-black top-0 left-0 opacity-50 z-40"></div>
          <div className="absolute w-2/3 h-screen bg-white top-0 left-0 z-50" id="sidebar">
            <div className="grid grid-rows-3 h-full">
              <div className="flex flex-col items-center justify-center gap-8 py-14 h-full">
                <div className="grid grid-cols-3">
                  <Image src="/auth/teeUpLogo.png" width={84} height={20} alt="teeup logo" className="col-start-2" />
                  <button className="close-button ms-10" onClick={() => setOpenMenu(false)}>
                    ✕
                  </button>
                </div>
                {userProfile?.cover_url ? (
                  <BGImage width={WIDTH_TYPES.FULL} height="130px" url={userProfile?.cover_url} />
                ) : (
                  <Image src="/uploads/icons/auth/default-profile.png" width={84} height={84} alt="profile" />
                )}
                <Heading as="h2" size="6">
                  {userProfile?.name}
                </Heading>
              </div>
              <nav className="h-full">
                {navbarItems.map((item: NavbarType, index: number) => {
                  return (
                    <Link
                      href={`${item.path}`}
                      key={index}
                      className={cn(
                        "flex p-6",
                        (pathName === item.path ||
                          pathName.includes(item.path) ||
                          ((pathName.length === 0 || pathName === "/") && item.path === "/home")) &&
                          "bg-red-200 border-l-4 border-red-500"
                      )}
                    >
                      <div className="flex gap-5">
                        {pathName === item.path ||
                        pathName.includes(item.path) ||
                        ((pathName.length === 0 || pathName === "/") && item.path === "/home")
                          ? item.activeIcon
                          : item.icon}
                        <p
                          className={cn(
                            "font-bold",
                            (pathName === item.path ||
                              pathName.includes(item.path) ||
                              ((pathName.length === 0 || pathName === "/") && item.path === "/home")) &&
                              "text-primary"
                          )}
                        >
                          {item.text}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <Box className="grid p-5 h-full">
                <div className="self-end space-y-3">
                  <div className="flex items-center gap-4">
                    <Image src="/sidebar/Logout.png" width={25} height={25} alt="logout icon" />
                    <Button onClick={handleLogout} loading={isPending} variant="link" className="p-0 text-black">
                      Log out
                    </Button>
                  </div>
                  <p>Version 1.1.0</p>
                </div>
              </Box>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
