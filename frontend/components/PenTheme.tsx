import { createMuiTheme } from "@material-ui/core/styles"
import { Shadows } from "@material-ui/core/styles/shadows"

const PenTheme = createMuiTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(28, 29, 31)",
      paper: "rgb(39, 40, 43)",
    },
  },
  shadows: Array(25).fill("none") as Shadows,
})

export default PenTheme
