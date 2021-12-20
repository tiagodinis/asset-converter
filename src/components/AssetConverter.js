import { useQuery } from "react-query"
import InteractionHeader from "./InteractionHeader"
import PairsList from "./PairsList"
import styled from "styled-components"
import { useState } from "react"

export default function AssetConverter() {
  const assets = useQuery("assets", fetchSupportedAssets)
  const [asset, setAsset] = useState({
    code: "USD",
    name: "US dollar",
    type: "fiat",
    image: "https://cdn.uphold.com/assets/USD.svg",
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

  return (
    <S_Converter>
      <InteractionHeader
        asset={asset}
        assetMap={assets.data}
        setAsset={setAsset}
      />
      <PairsList />
    </S_Converter>
  )
}

// STYLE
const S_Converter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
