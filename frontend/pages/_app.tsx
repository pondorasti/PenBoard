import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider, Box, Typography } from "@material-ui/core/"
import { ThemeProvider } from "@material-ui/core/styles"
import PenTheme from "../components/PenTheme"

function MyApp({ Component, pageProps }) {
  return (
    <StylesProvider>
      <ThemeProvider theme={PenTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StylesProvider>
  )
}

export default MyApp
