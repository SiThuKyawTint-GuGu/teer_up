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
    text: "Explore",
    path: "/explore",
    icon: <Icons.exploreIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.exploreIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Saved",
    path: "/saved",
    icon: <Icons.savedIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.savedIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Content History",
    path: "/content-history",
    icon: <Icons.historyIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.historyIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Chat",
    path: "/chat",
    icon: <Icons.chatIcon width={24} height={24} />,
    activeIcon: <Icons.chatIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Setting",
    path: "/setting",
    icon: <Icons.settingIcon width={24} height={24} />,
    activeIcon: <Icons.settingIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Mentorship",
    path: "/mentorship",
    icon: <Icons.mentorshipIcon width={24} height={24} />,
    activeIcon: <Icons.mentorshipIcon width={24} height={24} activeFill="#DA291C" active />,
  },
];
