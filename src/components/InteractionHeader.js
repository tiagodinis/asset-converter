import { useState } from "react"
import { useRef } from "react"

import CurrentAmount from "./CurrentAmount"
import CurrentAsset from "./CurrentAsset"
import { AssetSearcher } from "./AssetSearcher"
import styled from "styled-components"
import { useClickAway, useDebounce } from "react-use"

export default function InteractionHeader(props) {
  const [amount, setAmount] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const isHoveringCurrentAsset = useRef(null)
  const assetSearcherRef = useRef(null)
  const [filteredAssets, setFilteredAssets] = useState()

  useDebounce(() => setFilteredAssets(getFilteredAssets()), 200, [
    search,
    props.assetMap,
  ])

  function getFilteredAssets() {
    if (!props.assetMap) return

    let assetArr = [...props.assetMap.values()]
    if (search) {
      const lcSearch = search.toLowerCase()
      assetArr = assetArr.filter(
        (a) =>
          a.code.toLowerCase().includes(lcSearch) ||
          a.name.toLowerCase().includes(lcSearch) ||
          a.type.toLowerCase().includes(lcSearch)
      )
    }

    return assetArr
  }

  // Close searcher unless hovering currentAsset (let that component take over)
  useClickAway(assetSearcherRef, () => {
    if (!isHoveringCurrentAsset.current) setIsOpen(false)
  })

  function setIsHoveringCurrentAsset(isHovering) {
    isHoveringCurrentAsset.current = isHovering
  }

  function selectNewAsset(asset) {
    setIsOpen(false)
    props.setAsset(asset)
  }

  return (
    <S_Wrapper>
      <S_CurrentWidget>
        <CurrentAmount amount={amount} setAmount={setAmount} />
        <CurrentAsset
          asset={props.asset}
          setIsHoveringCurrentAsset={setIsHoveringCurrentAsset}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </S_CurrentWidget>
      {isOpen && (
        <AssetSearcher
          ref={assetSearcherRef}
          assets={filteredAssets}
          selectNewAsset={selectNewAsset}
          search={search}
          setSearch={setSearch}
        />
      )}
    </S_Wrapper>
  )
}

// STYLE
const S_Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
`

const S_CurrentWidget = styled.div`
  margin-top: 80px;
  padding: 12px 16px;

  height: fit-content;

  background: #f5f9fcff;
  border-radius: 8px;

  display: flex;
  align-items: center;
`
