import { Icons } from "@/components/ui/Images";
import { useGetUser } from "@/services/user";
import { navbarItems, NavbarType } from "@/shared/data/CompanyTabbar";
import { UserProfileResponse } from "@/types/Profile";
import { logout } from "@/utils/auth";
import { Box, CssBaseline, Drawer, Grid, ListItem, ListItemButton, Stack, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { mutate } from "swr";

const AppBar = styled(MuiAppBar)<MuiAppBarProps>(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  zIndex: theme.zIndex.drawer + 1,
}));

interface LayoutProps {
  children: React.ReactNode;
}

const CompanyDashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { data: profileData } = useGetUser<UserProfileResponse>();
  const [isPending, startTransition] = useTransition();
  const pathName = usePathname();
  const router = useRouter();

  const drawerWidth = 260;
  const userProfile = profileData?.data;

  const handleLogout = () => {
    logout();
    mutate(() => true, undefined, { revalidate: false });
    startTransition(() => {
      router.push("/admin/auth/login");
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, boxShadow: "none" }}
        >
          <Toolbar>
            <Grid container>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                <Stack direction="row" justifyContent="flex-end" spacing={2} alignItems="center">
                  {/* <Icons.noti width={24} height={24} /> */}
                  <IconButton sx={{ p: 0 }}>
                    <Image src="/uploads/icons/auth/default-profile.png" width={38} height={38} alt="profile" />
                  </IconButton>
                  <Stack>
                    <Typography variant="subtitle2">{userProfile?.name}</Typography>
                    <Typography variant="caption">{userProfile?.role}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            padding: 2,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Stack direction="column">
            <Stack direction="row" justifyContent="center" padding={3}>
              <IconButton>
                <Image src="/teeUpLogo.png" width={84} height={20} alt="teeupLogo" />
              </IconButton>
            </Stack>
            <List component="nav">
              {navbarItems.map((item: NavbarType, index: number) => (
                <React.Fragment key={item.path || index}>
                  <ListItem
                    key={item.path}
                    disablePadding
                    sx={{
                      backgroundColor: pathName === item.path ? "secondary.main" : "",
                      borderLeft: pathName === item.path ? "4px solid #DA291C" : "4px solid white",
                    }}
                  >
                    <ListItemButton component={Link} href={item.path}>
                      <ListItemIcon>{pathName === item.path ? item.activeIcon : item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          "& .MuiTypography-root": {
                            color: pathName === item.path ? "primary.main" : "",
                            fontWeight: pathName === item.path ? "600" : "",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {item.subItems && (
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subItem.path}
                          disablePadding
                          sx={{
                            backgroundColor: pathName === subItem.path ? "secondary.main" : "",
                            borderLeft: pathName === subItem.path ? "4px solid #DA291C" : "4px solid white",
                          }}
                        >
                          <ListItemButton component={Link} href={subItem.path}>
                            <ListItemText
                              primary={subItem.text}
                              sx={{
                                "& .MuiTypography-root": {
                                  color: pathName === subItem.path ? "primary.main" : "",
                                  fontWeight: pathName === subItem.path ? "600" : "",
                                  marginLeft: "60px",
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </React.Fragment>
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
                    <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, overflowY: "auto" }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default CompanyDashboardLayout;
