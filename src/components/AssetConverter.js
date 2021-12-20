import { useQuery } from "react-query"
import InteractionHeader from "./InteractionHeader"
import PairsList from "./PairsList"
import styled from "styled-components"

export default function AssetConverter() {
  const assets = useQuery("assets", fetchSupportedAssets)

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
    untrimmed.forEach((u) => map.set(u.code, { code: u.code, image: u.image }))

    return map
  }

  console.log(assets.data)

  return (
    <S_Converter>
      <InteractionHeader />
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
