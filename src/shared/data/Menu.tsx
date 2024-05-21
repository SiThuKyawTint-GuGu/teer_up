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
  {
    key: "/admin/contents",
    icon: <Icons.contents className="w-[20px] h-[20px]" />,
    title: "Contents",
    child: [
      {
        key: "/admin/contents/content",
        title: "Content",
        icon: <Icons.content className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/contents/category",
        title: "Category",
        icon: <Icons.category className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/contents/keywords",
        title: "Keywords",
        icon: <Icons.keyword className="w-[20px] h-[20px]" />,
      },
    ],
  },
  {
    key: "/admin/banners",
    icon: <Icons.carousel className="w-[20px] h-[20px]" />,
    title: "Banners",
    child: [],
  },
  {
    key: "/admin/schools",
    icon: <Icons.school className="w-[20px] h-[20px]" />,
    title: "School",
    child: [
      {
        key: "/admin/schools",
        title: "Schools",
        icon: <Icons.schoolBuilding className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/schools/education-level",
        title: "Education Level",
        icon: <Icons.school className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/schools/degrees",
        title: "Degrees",
        icon: <Icons.book className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/schools/majors",
        title: "Majors",
        icon: <Icons.major className="w-[20px] h-[20px]" />,
      },
    ],
  },
  {
    key: "/admin/form",
    icon: <Icons.form className="w-[20px] h-[20px]" />,
    title: "Form Config",
    child: [],
  },
  {
    key: "/admin/blogs",
    icon: <Icons.blogs className="w-[20px] h-[20px]" />,
    title: "Blogs",
    child: [
      {
        key: "/admin/blogs/posts",
        title: "Posts",
        icon: <Icons.post className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/blogs/category",
        title: "Category",
        icon: <Icons.category className="w-[20px] h-[20px]" />,
      },
    ],
  },
  {
    key: "/admin/configs",
    icon: <Icons.setting1 className="w-[20px] h-[20px]" />,

    title: "Configurations",
    child: [
      {
        key: "/admin/configs/industry",
        title: "Industry",
        icon: <Icons.industry className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/configs/departments",
        title: "Departments",
        icon: <Icons.department className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/configs/preferences",
        title: "Preferences",
        icon: <Icons.preference className="w-[20px] h-[20px]" />,
      },
    ],
  },
  {
    key: "/admin/setting",
    icon: <Icons.setting1 className="w-[20px] h-[20px]" />,
    title: "Recommendation",
    child: [
      {
        key: "/admin/setting/dimension",
        title: "Dimensions",
        icon: <Icons.dimension className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/setting/questions",
        title: "Questions",
        icon: <Icons.question className="w-[20px] h-[20px]" />,
      },
    ],
  },
  {
    key: "/admin/mentorship",
    icon: <Icons.mentor className="w-[20px] h-[20px]" />,
    title: "Mentorship",
    child: [],
  },
  {
    key: "/admin/notification",
    icon: <Icons.noti className="w-[20px] h-[20px]" />,
    title: "Notifications",
    child: [],
  },
  {
    key: "/admin/users",
    icon: <Icons.userManagement className="w-[20px] h-[20px]" />,
    title: "Users",
    child: [
      // {
      //   key: "/admin/users/user-scores",
      //   title: "User Scores",
      //   icon: <Icons.userscore className="w-[20px] h-[20px]" />,
      // },
      {
        key: "/admin/users/admin-list",
        title: "Admin",
        icon: <Icons.admin className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/users/school-admin-list",
        title: "School Admins",
        icon: <Icons.admin className="w-[20px] h-[20px]" />,
      },
      {
        key: "/admin/users/user-list",
        title: "User",
        icon: <Icons.userManagement className="w-[20px] h-[20px]" />,
      },
    ],
  },
];

export const actionMenu: Menu[] = [
  {
    key: "/admin/logout",
    icon: <Icons.logout className="w-[20px] h-[20px]" />,
    title: "Logout",
    child: [],
  },
];
