import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#795BFF",
      light: "#a18cff",
      dark: "#5631f7",
    },
    secondary: {
      main: "#191919",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});
