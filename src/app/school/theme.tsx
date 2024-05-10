import { createTheme } from "@mui/material/styles";
import { fontSans } from "../fonts";

const defaultTheme = createTheme({
  typography: {
    fontFamily: fontSans.style.fontFamily,
  },
  palette: {
    // mode: "light",
    primary: {
      main: "#DA291C",
    },
    secondary: {
      main: "#F9E9EA",
    },
  },
  // palette: {
  //   primary: {
  //     main: "#ffffff",
  //     dark: "#b2b2b2",
  //   },
  //   secondary: {
  //     main: "#DA291C",
  //     light: "#F9E9EA",
  //   },
  // },
  components: {},
});

export default defaultTheme;
