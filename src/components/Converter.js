import InteractionHeader from "./InteractionHeader"
import PairsList from "./PairsList"
import styled from "styled-components"
import { useState } from "react"
import { useDebounce } from "react-use"
import useUpholdData from "../hooks/useUpholdData"
import ThemeToggler from "./ThemeToggler"

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
  const [asset, setAsset] = useState(initialAsset)
  const [amount, setAmount] = useState("")
  const [debouncedAmount, setDebouncedAmount] = useState("")
  useDebounce(() => setDebouncedAmount(amount), 250, [amount])

  const { assets, tickers } = useUpholdData(asset)

  return (
    <S_Converter>
      <InteractionHeader
        amount={amount}
        setAmount={setAmount}
        assetMap={assets.data}
        asset={asset}
        setAsset={setAsset}
      />
      <PairsList amount={debouncedAmount} tickers={tickers.data?.pairs} />
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
