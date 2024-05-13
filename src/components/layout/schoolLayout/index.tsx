import { Icons, Image } from "@/components/ui/Images";
import { useGetUser } from "@/services/user";
import { NavbarType, navbarItems } from "@/shared/data/SchoolTabbar";
import { UserProfileResponse } from "@/types/Profile";
import { logout } from "@/utils/auth";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, CssBaseline, ListItem, ListItemButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { mutate } from "swr";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "white",
  color: "black",
  zIndex: theme.zIndex.drawer + 1, // Bring header to front
}));

interface LayoutProps {
  children: React.ReactNode;
}

const SchoolDashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { data: profileData } = useGetUser<UserProfileResponse>();
  const [open, setOpen] = useState(true); // Set the sidebar open by default
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();

  const userProfile = profileData?.data;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    mutate(() => true, undefined, { revalidate: false });
    startTransition(() => {
      router.push("/admin/auth/login");
    });
  };

  return (
    <>
      <CssBaseline />

      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ width: 250, flexShrink: 0, bgcolor: "background.paper", overflowY: "auto" }}>
          <div className="grid place-items-center p-6">
            <Image src="/teeUpLogo.png" width={84} height={20} alt="teeup logo" />
          </div>
          <List>
            {navbarItems.map((item: NavbarType, index: number) => (
              <ListItem
                key={item.path}
                disablePadding
                sx={{
                  backgroundColor:
                    (pathName === "/school" && item.path === "/school") || pathName.includes(item.path)
                      ? "secondary.main"
                      : "",
                  borderLeft:
                    (pathName === "/school" && item.path === "/school") || pathName.includes(item.path)
                      ? "4px solid #DA291C"
                      : "4px solid white",
                }}
              >
                <ListItemButton component={Link} href={item.path}>
                  <ListItemIcon>
                    {(pathName === "/school" && item.path === "/school") || pathName.includes(item.path)
                      ? item.activeIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiTypography-root": {
                        color:
                          (pathName === "/school" && item.path === "/school") || pathName.includes(item.path)
                            ? "primary.main"
                            : "",
                        fontWeight:
                          (pathName === "/school" && item.path === "/school") || pathName.includes(item.path)
                            ? "600"
                            : "",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem
              key="/logout"
              disablePadding
              sx={{
                borderLeft: "4px solid white",
              }}
            >
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Icons.schoolLogoutIcon width={24} height={24} fill="#373A36" />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", overflowY: "auto", paddingBottom: 8 }}>
          <AppBar position="sticky" sx={{ boxShadow: "none" }}>
            <Toolbar>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <TextField
                InputProps={{
                  startAdornment: <Icons.search color="inherit" />,
                  style: { borderRadius: 20 },
                }}
                variant="outlined"
                size="small"
              />
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="flex-end" spacing={2} alignItems="center">
                  <Icons.noti width={24} height={24} />
                  <IconButton sx={{ p: 0 }}>
                    <Image src="/uploads/icons/auth/default-profile.png" width={38} height={38} alt="profile" />
                  </IconButton>
                  <Stack>
                    <Typography variant="subtitle2">{userProfile?.name}</Typography>
                    <Typography variant="caption">{userProfile?.role}</Typography>
                  </Stack>
                </Stack>
              </Box>
            </Toolbar>
          </AppBar>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default SchoolDashboardLayout;
