import { useQuery } from "react-query"

export default function useUpholdData(asset) {
  const assets = useQuery("assets", fetchSupportedAssets)
  const tickers = useQuery(["tickers", asset.code], fetchTickersByAsset, {
    enabled: assets.data !== undefined,
  })

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

  async function fetchSupportedAssets() {
    let untrimmed = await fetchResources("assets")

    let map = new Map()
    untrimmed.forEach((u) =>
      map.set(u.code, {
        code: u.code,
        name: u.name,
        formatting: u.formatting,
        type: u.type,
        image: u.image,
      })
    )

    return map
  }

  async function fetchTickersByAsset() {
    let untrimmed = await fetchResources(`ticker/${asset.code}`)

    // Filter pairs bidirectional rates (just need rate in one direction)
    untrimmed = untrimmed.filter((u) => u.currency !== asset.code)
    // Store pair data (extracted code from u.pair, image from asset map)
    let assetTickers = { asset: asset.code, pairs: [] }
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

  return { assets, tickers }
}
