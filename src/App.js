import { QueryClient, QueryClientProvider } from "react-query"
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
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Converter />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
