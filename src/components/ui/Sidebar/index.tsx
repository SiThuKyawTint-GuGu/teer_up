"use client";

import BGImage from "@/components/shared/BGImage";
import { WIDTH_TYPES } from "@/components/shared/enums";
import { Image } from "@/components/ui/Images";
import { useGetUser } from "@/services/user";
import { navbarItems, NavbarType } from "@/shared/data/UserTabbar";
import "@/styles/sidebar.css";
import { UserProfileResponse } from "@/types/Profile";
import { logout } from "@/utils/auth";
import { cn } from "@/utils/cn";
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { mutate } from "swr";
import { Button } from "../Button";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const { data: profileData } = useGetUser<UserProfileResponse>();
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();

  const userProfile = profileData?.data;

  const handleLogout = () => {
    logout();
    mutate(() => true, undefined, { revalidate: false });
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="hamburger-button">
          <Image src="/uploads/icons/hambuger.png" width={20} height={20} alt="hambuger menu" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="grid grid-rows-3">
            <div className="flex flex-col items-center gap-8 py-14">
              <div className="grid grid-cols-3">
                <Image src="/auth/teeUpLogo.png" width={84} height={20} alt="teeup logo" className="col-start-2" />
                <Dialog.Close>
                  <button className="close-button ms-10">✕</button>
                </Dialog.Close>
              </div>
              {userProfile?.cover_url ? (
                <BGImage width={WIDTH_TYPES.FULL} height="130px" url={userProfile?.cover_url} />
              ) : (
                <Image src="/sidebar/profile.png" width={84} height={20} alt="profile" />
              )}
              <Heading as="h2" size="6" className="text-3xl font-bold">
                {userProfile?.name}
              </Heading>
            </div>
            <nav>
              {navbarItems.map((item: NavbarType, index: number) => {
                return (
                  <Link
                    href={`${item.path}`}
                    key={index}
                    className={cn(
                      "flex p-5",
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
                          "",
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
            <Box className="grid p-5">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Sidebar;
