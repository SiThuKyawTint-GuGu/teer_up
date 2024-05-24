import { Icons } from "@/components/ui/Images";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

export type NavbarType = {
  text: string;
  path: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
};

export const navbarItems: NavbarType[] = [
  {
    text: "Dashboard",
    path: "/school/dashboard",
    icon: <SpaceDashboardIcon sx={{ fontSize: 24 }} />,
    activeIcon: <SpaceDashboardIcon sx={{ fontSize: 24, color: "#DA291C" }} />,
  },
  {
    text: "Opportunities",
    path: "/school/opportunities",
    icon: <Icons.schoolJobIcon width={24} height={24} fill="#373A36" />,
    activeIcon: <Icons.schoolJobIcon width={24} height={24} activeFill="#DA291C" active />,
  },
  {
    text: "Student Groups",
    path: "/school/student-group",
    icon: <PeopleIcon sx={{ fontSize: 24 }} />,
    activeIcon: <PeopleIcon sx={{ fontSize: 24, color: "#DA291C" }} />,
  },
  {
    text: "Setting",
    path: "/school/setting",
    icon: <SettingsIcon sx={{ fontSize: 24 }} />,
    activeIcon: <SettingsIcon sx={{ fontSize: 24, color: "#DA291C" }} />,
  },
];
