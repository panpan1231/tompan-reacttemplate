import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#1b1969",
      main: "#15155a",
      dark: "#12154a",
      contrastText: "#fff",
    },
    inputColor: "#2e2e83",
    textNav: {
      light: "#1b1969",
      main: "#1b1969",
      dark: "#1b1969",
      contrastText: "#fff",
    },
    status: {
      success: "#2fbe6a",
      fail: "#ff3e3e",
      processing: "#ef8e35",
      cancel: "rgba(255, 255, 255, 0.6)",
    },
    secondary: {
      light: "#fe2a6d",
      main: "#f64246",
      dark: "#e32036",
      contrastText: "#fff",
    },
    white: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "rgba(0, 0, 0, 0.1)",
      contrastText: "#ffffffcc",
    },
    fade: {
      light: "rgba(0, 0, 0, 0.88)",
      main: "#0c0b3a",
      dark: "rgba(255, 255, 255, 0.6)",
      contrastText: "rgba(255, 255, 255, 0.3)",
    },
    green: {
      light: "#2fbe6a",
      main: "#2fbe6a",
      dark: "#2fbe6a",
      contrastText: "#2fbe6a",
    },
    disable: "#F1F3F4",
    footerDisable: "#4a49d7",
    footerEnable: "#fe2a6d",
  },
  fontSetting: {
    huge: "1.5rem",
    large: "1.25rem",
    bigger: "1.125rem",
    normal: "1rem",
    middle: "0.875rem",
    small: "0.75rem",
  },
});

export default theme;
