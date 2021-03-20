import { createMuiTheme } from "@material-ui/core/styles"
import { Shadows } from "@material-ui/core/styles/shadows"

const PenTheme = createMuiTheme({
  palette: {
    mode: "dark",
  },
  shadows: Array(25).fill("none") as Shadows,
})

export default PenTheme
