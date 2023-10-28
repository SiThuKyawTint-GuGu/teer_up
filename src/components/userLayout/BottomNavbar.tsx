"use client";

import { NavbarItems, NavbarType } from "@/shared/data/UserTabbar";
import { cn } from "@/utils/cn";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathName = usePathname();

  return (
    <Flex
      className="bg-white w-full max-w-[400px] mx-auto z-[9]"
      align="center"
      justify="between"
      position="fixed"
      bottom="0"
    >
      {NavbarItems.map((item: NavbarType, index: number) => (
        <div key={index} className="p-2">
          <Link
            href={item.path}
            className={cn(
              "flex justify-center items-center flex-col",
              pathName === item.path && "text-primary"
            )}
          >
            {item.icon}
            <p>{item.text}</p>
          </Link>
        </div>
      ))}
    </Flex>
  );
};

export default BottomNavbar;
