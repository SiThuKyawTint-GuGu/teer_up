"use client";

import { navbarItems, NavbarType } from "@/shared/data/UserTabbar";
import { cn } from "@/utils/cn";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathName = usePathname();
  return (
    <Flex
      className="bg-white w-full max-w-[400px] mx-auto z-[9] shadow-[0px_-3px_9px_0px_rgba(0,_0,_0,_0.06)] px-5"
      align="center"
      justify="between"
      position="fixed"
      bottom="0"
    >
      {navbarItems.map((item: NavbarType, index: number) => {
        return (
          <div key={index} className="p-2">
            {item.path === "/home" || item.path === "/explore" ? (
              <a
                href={item.path}
                className={cn(
                  "flex justify-center items-center flex-col",
                  (pathName === item.path ||
                    pathName.includes(item.path) ||
                    ((pathName.length === 0 || pathName === "/") && item.path === "/home")) &&
                    "text-primary"
                )}
              >
                {pathName === item.path ||
                pathName.includes(item.path) ||
                ((pathName.length === 0 || pathName === "/") && item.path === "/home")
                  ? item.activeIcon
                  : item.icon}
                <p>{item.text}</p>
              </a>
            ) : (
              <Link
                href={item.path}
                scroll={false}
                className={cn(
                  "flex justify-center items-center flex-col",
                  (pathName === item.path ||
                    pathName.includes(item.path) ||
                    ((pathName.length === 0 || pathName === "/") && item.path === "/home")) &&
                    "text-primary"
                )}
              >
                {pathName === item.path ||
                pathName.includes(item.path) ||
                ((pathName.length === 0 || pathName === "/") && item.path === "/home")
                  ? item.activeIcon
                  : item.icon}
                <p>{item.text}</p>
              </Link>
            )}
          </div>
        );
      })}
    </Flex>
  );
};

export default BottomNavbar;
