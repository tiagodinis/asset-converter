import { useQuery } from "react-query"
import InteractionHeader from "./InteractionHeader"
import PairsList from "./PairsList"
import styled from "styled-components"
import { useState } from "react"
import { useDebounce } from "react-use"

export default function Converter() {
  const [asset, setAsset] = useState({
    code: "USD",
    name: "US dollar",
    type: "fiat",
    image: "https://cdn.uphold.com/assets/USD.svg",
  })
  const [amount, setAmount] = useState("")
  const [debouncedAmount, setDebouncedAmount] = useState("")
  useDebounce(() => setDebouncedAmount(amount), 250, [amount])

  const assets = useQuery("assets", fetchSupportedAssets)
  const tickers = useQuery(["tickers", asset.code], fetchTickersByAsset, {
    enabled: assets.data !== undefined,
  })

  async function fetchSupportedAssets() {
    let response
    try {
      response = await fetch("http://localhost:3001/assets")
    } catch (err) {
      console.log(err)
      return
    }
    if (!response.ok) throw new Error("Network response was not ok")

    let untrimmed = await response.json()
    let map = new Map()
    untrimmed.forEach((u) =>
      map.set(u.code, {
        code: u.code,
        name: u.name,
        type: u.type,
        image: u.image,
      })
    )

    return map
  }

  async function fetchTickersByAsset() {
    let response
    try {
      response = await fetch("http://localhost:3001/ticker/" + asset.code)
    } catch (err) {
      console.log(err)
      return
    }
    if (!response.ok) throw new Error("Network response was not ok")

    let untrimmed = await response.json()

    let assetTickers = { asset: asset.code, pairs: [] }
    untrimmed = untrimmed.filter((u) => u.currency !== asset.code)
    // Store pair data
    untrimmed.forEach((u) => {
      let sliceIndex = asset.code.length
      if (u.pair[sliceIndex] === "-") sliceIndex++
      let code = u.pair.slice(sliceIndex)
      assetTickers.pairs.push({
        code: code,
        ask: u.ask,
        bid: u.bid,
        image: assets.data.get(code)?.image,
      })
    })

    return assetTickers
  }

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
