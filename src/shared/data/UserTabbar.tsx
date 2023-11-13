import { Icons } from "@/components/ui/Images";

export type NavbarType = {
  text: string;
  path: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
};
export const navbarItems: NavbarType[] = [
  {
    text: "Home",
    path: "/home",
    icon: <Icons.homeIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.homeIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Browse",
    path: "/browse",
    icon: <Icons.globeIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.globeIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  // {
  //   text: "Mentorship",
  //   path: "/mentorship",
  //   icon: <Icons.people width={24} height={24} />,
  // },
  {
    text: "Saved",
    path: "/saved",
    icon: <Icons.savedIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.savedIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Profile",
    path: "/profile",
    icon: <Icons.profileIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.profileIcon width={24} height={24} activeFill="#DA291C" active />,
  },
];
