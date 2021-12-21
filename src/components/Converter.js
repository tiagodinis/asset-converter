import InteractionHeader from "./InteractionHeader"
import PairsList from "./PairsList"
import styled from "styled-components"
import { useState } from "react"
import { useDebounce } from "react-use"
import useUpholdData from "../hooks/useUpholdData"

const initialAsset = {
  code: "USD",
  name: "US dollar",
  type: "fiat",
  image: "https://cdn.uphold.com/assets/USD.svg",
}

export default function Converter() {
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
    </S_Converter>
  )
}

// STYLE
const S_Converter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
