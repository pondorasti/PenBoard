import { createMuiTheme } from "@material-ui/core/styles"
import { Shadows } from "@material-ui/core/styles/shadows"

const PenTheme = createMuiTheme({
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
