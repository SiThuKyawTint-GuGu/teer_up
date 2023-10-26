import { Icons } from "@/components/ui/Images";

export interface Menu {
  key: string;
  icon: JSX.Element;
  title: string;
  child?: {
    key: string;
    icon?: JSX.Element;
    title: string;
  }[];
}

export const menuList: Menu[] = [
  // {
  //   key: "/admin/innovates/projects" || "/admin/innovates/challenges",
  //   icon: <Icons.innovates className="w-[20px] h-[20px]" />,
  //   title: "Innovates",
  //   child: [
  //     { key: "/admin/innovates/projects", title: "Projects" },
  //     { key: "/admin/innovates/challenges", title: "Challenges" },
  //   ],
  // },
  {
    key: "/admin/contents/content" || "/admin/contents/category",
    icon: <Icons.contents className="w-[20px] h-[20px]" />,
    title: "Contents",
    child: [
      { key: "/admin/contents/content", title: "Content" },
      { key: "/admin/contents/category", title: "Category" },
    ],
  },
  {
    key: "/admin/form",
    icon: <Icons.form className="w-[20px] h-[20px]" />,
    title: "Form Config",
    child: [],
  },
  // {
  //   key: "/admin/users",
  //   icon: <Icons.users className="w-[20px] h-[20px]" />,
  //   title: "Users",
  //   child: [],
  // },
  {
    key: "/admin/blogs/category" || "/admin/blogs/posts",
    icon: <Icons.blogs className="w-[20px] h-[20px]" />,
    title: "Blogs",
    child: [
      { key: "/admin/blogs/category", title: "Category" },
      { key: "/admin/blogs/posts", title: "Posts" },
    ],
  },
  {
    key:
      "/admin/configs/industry" ||
      "/admin/configs/departments" ||
      "/admin/configs/preferences" ||
      "/admin/configs/keywords",
    icon: <Icons.setting className="w-[20px] h-[20px]" />,

    title: "Configurations",
    child: [
      { key: "/admin/configs/industry", title: "Industry" },
      { key: "/admin/configs/departments", title: "Departments" },
      { key: "/admin/configs/preferences", title: "Preferences" },
      { key: "/admin/configs/keywords", title: "Keywords" },
    ],
  },
  {
    key: "/admin/setting/dimension" || "/admin/setting/questions",
    icon: <Icons.setting1 className="w-[20px] h-[20px]" />,
    title: "Recommendation",
    child: [
      { key: "/admin/setting/dimension", title: "Dimensions" },
      { key: "/admin/setting/questions", title: "Questions" },
    ],
  },
  {
    key: "/admin/user-management",
    icon: <Icons.userManagement className="w-[20px] h-[20px]" />,
    title: "Users",
    child: [
      {
        key: "/admin/users/admin-list",
        title: "Admin",
      },
      {
        key: "/admin/users/user-list",
        title: "User",
      },
    ],
  },
  // {
  //   key: '/payments',
  //   icon: <Icons.payments className="w-[20px] h-[20px]" />,
  //   title: 'Payments',
  //   child: [],
  // },
  // {
  //   key: '/investment',
  //   icon: <Icons.investment className="w-[20px] h-[20px]" />,
  //   title: 'Investment',
  //   child: [],
  // },
  // {
  //   key: '/profile',
  //   icon: <Icons.user className="w-[20px] h-[20px]" />,
  //   title: 'Profile',
  //   child: [],
  // },
  // {
  //   key: '/support',
  //   icon: <Icons.support className="w-[20px] h-[20px]" />,
  //   title: 'Support',
  //   child: [],
  // },
  // {
  //   key: '/client',
  //   icon: <PersonIcon />,
  //   title: 'Clients',
  //   child: [
  //     {
  //       icon: <TableIcon />,
  //       title: 'Listing',
  //     },
  //     {
  //       icon: <EnterIcon />,
  //       title: 'Payment',
  //     },
  //     {
  //       icon: <ImageIcon />,
  //       title: 'Gallary',
  //     },
  //   ],
  // },
];

export const actionMenu: Menu[] = [
  {
    key: "/admin/logout",
    icon: <Icons.logout className="w-[20px] h-[20px]" />,
    title: "Logout",
    child: [],
  },
];
