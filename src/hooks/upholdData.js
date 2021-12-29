import { useQuery } from "react-query"
import { useState, useEffect } from "react"

async function fetchResources(path) {
  let response
  try {
    response = await fetch(`http://localhost:3001/${path}`)
  } catch (err) {
    console.log(err)
    return
  }
  if (!response.ok) throw new Error("Network response was not ok")

  return await response.json()
}

export function useAssets() {
  const rawAssets = useQuery("assets", async () => fetchResources("assets"))
  const [assetMap, setAssetMap] = useState()

  useEffect(() => {
    if (!rawAssets.data) return

    let newAssetMap = new Map()

    rawAssets.data.forEach((u) =>
      newAssetMap.set(u.code, {
        code: u.code,
        name: u.name,
        symbol: u.symbol,
        formatting: u.formatting,
        type: u.type,
        image: u.image,
      })
    )

    setAssetMap(newAssetMap)
  }, [rawAssets.data])

  return assetMap
}

export function usePairs(assetMap, asset) {
  const rawTickers = useQuery(["tickers", asset.code], async () => {
    setPairs(null) // (!) Make sure to show throbber
    return fetchResources(`ticker/${asset.code}`)
  })
  const [pairs, setPairs] = useState()

  useEffect(() => {
    if (!assetMap || !asset || !rawTickers.data) return

    let newPairs = []
    rawTickers.data
      // Filter pairs bidirectional rates (just need rate in one direction)
      .filter((rt) => rt.currency !== asset.code)
      // Trim and store additional data (code from rt.pair, image and formatting from assetMap)
      .forEach((rt) => {
        let sliceIndex = asset.code.length
        if (rt.pair[sliceIndex] === "-") sliceIndex++
        let code = rt.pair.slice(sliceIndex)
        newPairs.push({
          code: code,
          ask: rt.ask,
          bid: rt.bid,
          formatting: assetMap.get(code)?.formatting,
          image: assetMap.get(code)?.image,
        })
      })

    setPairs(newPairs)
  }, [assetMap, asset, rawTickers.data])

  return pairs
}
