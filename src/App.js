import { QueryClient, QueryClientProvider } from "react-query"
import { GlobalStyle } from "./styles/GlobalStyle"
import AssetConverter from "./components/AssetConverter"

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
      <AssetConverter />
    </QueryClientProvider>
  )
}
