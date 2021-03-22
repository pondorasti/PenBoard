import CssBaseline from "@material-ui/core/CssBaseline"
import { StylesProvider } from "@material-ui/core/"
import { ThemeProvider } from "@material-ui/core/styles"
import PenTheme from "../components/PenTheme"
import { Provider } from "react-redux"
import { store } from "./redux/store"

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
