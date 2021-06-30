import { createMuiTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#aa8888",
      main: "#996666",
      dark: "#2e355b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000",
    },
    background: {
      default: "#e0d0d8",
      paper: "#e8d8e0",
      partBg: "#ffccee",
    },
    openTitle: "#3f4771",
    protectedTitle: pink["400"],
    type: "light",
  },
});

export default theme;
