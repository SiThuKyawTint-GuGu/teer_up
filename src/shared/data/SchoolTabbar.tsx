import { Icons } from "@/components/ui/Images";

export type NavbarType = {
  text: string;
  path: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
};

export const navbarItems: NavbarType[] = [
  {
    text: "Dashboard",
    path: "/school",
    icon: <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolBlogIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Opportunities",
    path: "/school/opportunities",
    icon: <Icons.schoolJobIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolJobIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Students",
    path: "/school/students",
    icon: <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolBlogIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Setting",
    path: "/school/setting",
    icon: <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolBlogIcon width={24} height={24} activeFill="#DA291C" active />,
  },
];
