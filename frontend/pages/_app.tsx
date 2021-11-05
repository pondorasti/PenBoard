import CssBaseline from "@mui/material/CssBaseline"
import { StylesProvider } from "@mui/styles"
import { ThemeProvider } from "@mui/material/styles"
import PenTheme from "../components/PenTheme"
import { Provider } from "react-redux"
import { store } from "../redux/store"

function MyApp({ Component, pageProps }) {
  return (
    <StylesProvider>
      <ThemeProvider theme={PenTheme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default MyApp
