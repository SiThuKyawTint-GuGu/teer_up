import { Icons, Image } from "@/components/ui/Images";
import { useGetUser } from "@/services/user";
import { navbarItems, NavbarType } from "@/shared/data/CompanyTabbar";
import { UserProfileResponse } from "@/types/Profile";
import { logout } from "@/utils/auth";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Collapse,
  CssBaseline,
  Drawer,
  Grid,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
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
  zIndex: theme.zIndex.drawer + 1,
}));

interface LayoutProps {
  children: React.ReactNode;
}

const CompanyDashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { data: profileData } = useGetUser<UserProfileResponse>();
  const [open, setOpen] = useState(true);
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

      <Drawer open={open} onClose={() => handleDrawerToggle()}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => handleDrawerToggle()}>
          <Stack direction="row" justifyContent="center" padding={3}>
            <Image src="/teeUpLogo.png" width={84} height={20} alt="teeup logo" />
          </Stack>
          <List>
            {navbarItems.map((item: NavbarType, index: number) => (
              <>
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
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          disablePadding
                          sx={{
                            backgroundColor: pathName === item.path ? "secondary.main" : "",
                            borderLeft: pathName === item.path ? "4px solid #DA291C" : "4px solid white",
                          }}
                        >
                          <ListItemButton component={Link} href={subItem.path}>
                            <ListItemText
                              primary={subItem.text}
                              sx={{
                                "& .MuiTypography-root": {
                                  color: pathName === item.path ? "primary.main" : "",
                                  fontWeight: pathName === subItem.path ? "600" : "",
                                  marginLeft: "60px",
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
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
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", bgcolor: "background.default", overflowY: "auto" }}>
        <AppBar position="sticky" sx={{ boxShadow: "none" }}>
          <Toolbar>
            <Grid container>
              <Grid item xs={5}>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => handleDrawerToggle()}
                  >
                    <MenuIcon />
                  </IconButton>
                  <TextField
                    InputProps={{
                      startAdornment: <Icons.search color="inherit" />,
                      style: { borderRadius: 20, marginRight: 20 },
                    }}
                    fullWidth={true}
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </Grid>
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
        </AppBar>
        {children}
      </Box>
    </>
  );
};

export default CompanyDashboardLayout;
