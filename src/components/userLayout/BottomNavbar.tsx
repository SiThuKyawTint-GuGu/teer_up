"use client";

import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/Images";

const BottomNavbar = () => {
  const pathName = usePathname();

  return (
    <Flex
      className="bg-white w-full max-w-[400px] mx-auto"
      align="center"
      justify="between"
      position="fixed"
      bottom="0"
    >
      {NavbarItems.map((item: NavbarType, index: number) => (
        <div key={index} className="p-2">
          <Link
            href={item.path}
            className={`flex justify-center items-center flex-col ${
              pathName === item.path && "text-primary"
            }`}
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

type NavbarType = {
  text: string;
  path: string;
  icon: React.ReactNode;
};
const NavbarItems: NavbarType[] = [
  {
    text: "Home",
    path: "/home",
    icon: <Icons.home width={24} height={24} />,
  },
  {
    text: "Browse",
    path: "/browse",
    icon: <Icons.globe width={24} height={24} />,
  },
  {
    text: "Network",
    path: "/network",
    icon: <Icons.people width={24} height={24} />,
  },
  {
    text: "Saved",
    path: "saved",
    icon: <Icons.saved width={24} height={24} />,
  },
  {
    text: "Profile",
    path: "/profile",
    icon: <Icons.person width={24} height={24} />,
  },
];
