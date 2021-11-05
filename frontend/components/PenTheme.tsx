import { createTheme } from "@mui/material/styles"
import { Shadows } from "@mui/styles/legacy"

const PenTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(95, 108, 203)",
    },
    background: {
      default: "rgb(28, 29, 31)",
      paper: "rgb(39, 40, 43)",
    },
  },
  shadows: Array(25).fill("none") as Shadows,
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
})

export default PenTheme
