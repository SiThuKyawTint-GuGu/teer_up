import { Icons } from "@/components/ui/Images";
import { useGetUser } from "@/services/user";
import { navbarItems, NavbarType } from "@/shared/data/CompanyTabbar";
import { UserProfileResponse } from "@/types/Profile";
import { logout } from "@/utils/auth";
import { Box, CssBaseline, Drawer, ListItem, ListItemButton, Stack } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
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

  const drawerWidth = 220;
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
        {/* <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, boxShadow: "none" }}
        >
          <Toolbar>
            <Grid container>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
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
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar> */}
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            padding: 2,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          <Stack direction="column">
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ paddingY: "25px", paddingX: "10px" }}
            >
              <Image src="/teeUpLogo.png" width={84} height={20} alt="teeupLogo" />
            </Stack>
            <List component="nav">
              {navbarItems.map((item: NavbarType, index: number) => (
                <React.Fragment key={item.path || index}>
                  <ListItem
                    key={item.path}
                    sx={{
                      paddingLeft: 0,
                      backgroundColor: pathName === item.path ? "secondary.main" : "",
                      borderLeft: pathName === item.path ? "6px solid #DA291C" : "6px solid white",
                    }}
                  >
                    <ListItemButton
                      component={Link}
                      href={item.path}
                      sx={{
                        marginLeft: 0,
                        paddingLeft: 0,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {pathName === item.path ? item.activeIcon : item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          "& .MuiTypography-root": {
                            color: pathName === item.path ? "primary.main" : "",
                            fontWeight: pathName === item.path ? "700" : "",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {item.subItems && (
                    <List
                      component="div"
                      sx={{
                        padding: 0,
                      }}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subItem.path}
                          sx={{
                            paddingLeft: 0,
                            backgroundColor: pathName === subItem.path ? "secondary.main" : "",
                            borderLeft: pathName === subItem.path ? "6px solid #DA291C" : "6px solid white",
                          }}
                        >
                          <ListItemButton
                            component={Link}
                            href={subItem.path}
                            sx={{
                              margin: 0,
                              padding: 0,
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                              "&.Mui-focusVisible": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            ></ListItemIcon>
                            <ListItemText
                              primary={subItem.text}
                              sx={{
                                "& .MuiTypography-root": {
                                  color: pathName === subItem.path ? "primary.main" : "",
                                  fontWeight: pathName === subItem.path ? "700" : "",
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
              <ListItem key="/logout" sx={{ borderLeft: "6px solid white", paddingLeft: 0 }}>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    margin: 0,
                    padding: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Icons.schoolBlogIcon width={24} height={24} fill="#373A36" />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: "24px" }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default CompanyDashboardLayout;
