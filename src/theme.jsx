import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9", // Biru muda
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a5d6a7", // Hijau lembu
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          margin: "0 8px",
        },
      },
    },
  },
});

export default theme;
