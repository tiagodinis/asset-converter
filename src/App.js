import { QueryClient, QueryClientProvider } from "react-query"
import { Theme, lightTheme, darkTheme } from "./styles/themes"
import { useLocalStorage } from "react-use"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./styles/GlobalStyle"
import Converter from "./components/Converter"
// import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  const [theme, setTheme] = useLocalStorage("theme", Theme.Light)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === Theme.Light ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Converter setTheme={setTheme} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
