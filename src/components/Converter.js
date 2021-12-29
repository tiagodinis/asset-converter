import { useState } from "react"
import { useAssets } from "../hooks/upholdData"
import InteractionHeader from "./InteractionHeader"
import PairsList from "./PairsList"
import ThemeToggler from "./ThemeToggler"
import styled from "styled-components"

const initialAsset = {
  code: "USD",
  name: "US Dollar",
  symbol: "$",
  formatting: {
    decimal: ".",
    format: "symbol value code",
    grouping: ",",
    precision: "2",
  },
  type: "fiat",
  image: "https://cdn.uphold.com/assets/USD.svg",
}

export default function Converter({ setTheme }) {
  const [debouncedAmount, setDebouncedAmount] = useState("")
  const [asset, setAsset] = useState(initialAsset)

  const assetMap = useAssets()

  return (
    <S_Converter>
      <InteractionHeader
        setDebouncedAmount={setDebouncedAmount}
        asset={asset}
        assetMap={assetMap}
        setAsset={setAsset}
      />
      <PairsList amount={debouncedAmount} assetMap={assetMap} asset={asset} />
      <ThemeToggler setTheme={setTheme} />
    </S_Converter>
  )
}

// STYLE
const S_Converter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
