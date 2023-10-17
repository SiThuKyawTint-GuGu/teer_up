import { createTheme } from "@mui/material/styles";
import { fontSans } from "../fonts";

const defaultTheme = createTheme({
  typography: {
    fontFamily: fontSans.style.fontFamily,
  },
  palette: {
    mode: "light",
  },
});

export default defaultTheme;
