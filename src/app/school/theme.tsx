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
  components: {
    MuiTextField: {
      defaultProps: {
        size: "medium",
      },
    },
  },
});

export default defaultTheme;
