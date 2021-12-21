import { useEffect, useState } from "react"
import { useRef } from "react"

import { CurrentAmount } from "./CurrentAmount"
import CurrentAsset from "./CurrentAsset"
import { AssetSearcher } from "./AssetSearcher"
import styled from "styled-components"
import { useClickAway, useDebounce } from "react-use"

export default function InteractionHeader({
  amount,
  setAmount,
  assetMap,
  asset,
  setAsset,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const isHoveringCurrentAsset = useRef(null)
  const currentAmountRef = useRef(null)
  const assetSearcherRef = useRef(null)
  const searchBarRef = useRef(null)
  const [filteredAssets, setFilteredAssets] = useState()

  useDebounce(() => setFilteredAssets(getFilteredAssets()), 250, [
    search,
    assetMap,
  ])

  function getFilteredAssets() {
    if (!assetMap) return

    let assetArr = [...assetMap.values()]
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
    setAsset(asset)
  }

  // Set initial focus based on asset search state
  useEffect(() => {
    if (isOpen) searchBarRef.current.focus()
    else currentAmountRef.current.focus()
  }, [isOpen])

  return (
    <S_Wrapper>
      <S_CurrentWidget>
        <CurrentAmount
          ref={currentAmountRef}
          asset={asset}
          amount={amount}
          setAmount={setAmount}
        />
        <CurrentAsset
          asset={asset}
          setIsHoveringCurrentAsset={setIsHoveringCurrentAsset}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </S_CurrentWidget>

      {isOpen && (
        <S_AssetSearcher ref={assetSearcherRef}>
          <AssetSearcher
            ref={searchBarRef}
            assets={filteredAssets}
            selectNewAsset={selectNewAsset}
            search={search}
            setSearch={setSearch}
          />
        </S_AssetSearcher>
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

  width: 500px;
  height: fit-content;

  background: #f5f9fcff;
  border-radius: 8px;

  display: flex;
  align-items: center;
`

const S_AssetSearcher = styled.div`
  position: absolute;
  top: calc(100% + 20px);

  width: 100%;

  background: #f5f9fcff;
  border-radius: 8px;
`
