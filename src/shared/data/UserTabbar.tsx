import { Icons } from "@/components/ui/Images";

export type NavbarType = {
  text: string;
  path: string;
  icon: React.ReactNode;
};
export const NavbarItems: NavbarType[] = [
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
    text: "Mentorship",
    path: "/mentorship",
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
