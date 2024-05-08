"use client";

import { Image } from "@/components/ui/Images";
import { useGetUser } from "@/services/user";
import { navbarItems, NavbarType } from "@/shared/data/UserTabbar";
import { UserProfileResponse } from "@/types/Profile";
import { logout } from "@/utils/auth";
import { cn } from "@/utils/cn";
import { Box, Button, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { mutate } from "swr";
// import { Button } from "../Button";

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
          <div className="absolute w-3/4 h-screen bg-white top-0 left-0 z-50" id="sidebar">
            <div className="grid grid-rows-12 h-full">
              <div className="flex flex-col items-center justify-center h-full row-span-4 py-8 gap-5">
                <div className="grid grid-cols-3 mb-8">
                  <Image src="/auth/teeUpLogo.png" width={84} height={20} alt="teeup logo" className="col-start-2" />
                  <button className="close-button ms-10" onClick={() => setOpenMenu(false)}>
                    ✕
                  </button>
                </div>
                <Image src="/uploads/icons/auth/default-profile.png" width={64} height={64} alt="profile" />
                <Heading as="h2" size="6">
                  {userProfile?.name}
                </Heading>
                <Button radius="full" size="1" variant="surface" color="crimson" className="bg-red-100">
                  <Image src="/uploads/icons/user.png" width={18} height={18} alt="profile user" />
                  <Text color="gray">View Profile</Text>
                </Button>
              </div>
              <nav className="row-span-6">
                {navbarItems.map((item: NavbarType, index: number) => {
                  return (
                    <Link
                      href={`${item.path}`}
                      key={index}
                      className={cn(
                        "flex p-4 border-l-4 border-white",
                        (pathName === item.path ||
                          pathName.includes(item.path) ||
                          ((pathName.length === 0 || pathName === "/") && item.path === "/home")) &&
                          "bg-red-100 border-l-4 border-red-500"
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
                            "",
                            (pathName === item.path ||
                              pathName.includes(item.path) ||
                              ((pathName.length === 0 || pathName === "/") && item.path === "/home")) &&
                              "text-primary font-semibold"
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
                  {/* <div className="flex items-center gap-4">
                    <Image src="/sidebar/Logout.png" width={25} height={25} alt="logout icon" />
                    <Button onClick={handleLogout} loading={isPending} variant="link" className="p-0 text-black">
                      Log out
                    </Button>
                  </div> */}
                  <p className="font-base font-light">Version 1.1.0</p>
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
