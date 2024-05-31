import { Icons } from "@/components/ui/Images";

export type SubItemType = {
  text: string;
  path: string;
  subItems?: SubItemType[];
};

export type NavbarType = {
  text: string;
  path: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  subItems?: SubItemType[];
};

export const navbarItems: NavbarType[] = [
  {
    text: "Dashboard",
    path: "/company",
    icon: <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolBlogIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Opportunities",
    path: "/company/opportunities",
    icon: <Icons.schoolJobIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolJobIcon width={24} height={24} activeFill="#DA291C" active />,
    subItems: [
      {
        text: "Job Posting",
        path: "/company/opportunities/job",
      },
      {
        text: "View Applicants",
        path: "/company/applicants",
      },
    ],
  },
  {
    text: "Question Form",
    path: "/company/dynamic-form",
    icon: <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolBlogIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Students",
    path: "/company/students",
    icon: <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolBlogIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Setting",
    path: "/company/setting",
    icon: <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolBlogIcon width={24} height={24} activeFill="#DA291C" active />,
  },
];
