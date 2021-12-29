import { useEffect, useState, useRef } from "react"
import { useClickAway } from "react-use"
import { CurrentAmount } from "./CurrentAmount"
import CurrentAsset from "./CurrentAsset"
import { AssetSearcher } from "./AssetSearcher"
import styled from "styled-components"
import {
  clampedLerp,
  doubler,
  gridRange,
  tickerRange,
} from "../utilities/styledHelpers"

export default function InteractionHeader({
  setDebouncedAmount,
  asset,
  assetMap,
  setAsset,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const isHoveringCurrentAsset = useRef(null)
  const assetSearcherRef = useRef(null)
  const currentAmountRef = useRef(null)
  const searchBarRef = useRef(null)

  // Close AssetSearcher when clicking outside of it, unless user is hovering CurrentAsset
  // In that case let CurrentAsset control the isOpen state
  useClickAway(assetSearcherRef, () => {
    if (!isHoveringCurrentAsset.current) setIsOpen(false)
  })

  // Set focus based on AssetSearcher open state
  useEffect(() => {
    if (isOpen) searchBarRef.current.focus()
    else currentAmountRef.current.focus()
  }, [isOpen])

  // Selecting an asset closes the AssetSearcher
  function selectNewAsset(asset) {
    setIsOpen(false)
    setAsset(asset)
  }

  return (
    <S_InteractionHeader>
      <S_CurrentWidget>
        <CurrentAmount
          ref={currentAmountRef}
          precision={asset.formatting.precision}
          setDebouncedAmount={setDebouncedAmount}
        />
        <CurrentAsset
          asset={asset}
          isHoveringCurrentAsset={isHoveringCurrentAsset}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </S_CurrentWidget>

      {isOpen && (
        <S_AssetSearcher ref={assetSearcherRef}>
          <AssetSearcher
            ref={searchBarRef}
            assetMap={assetMap}
            selectNewAsset={selectNewAsset}
          />
        </S_AssetSearcher>
      )}
    </S_InteractionHeader>
  )
}

// STYLE
const S_InteractionHeader = styled.div`
  position: relative; /* So that AssetSearcher pos is relative to InteractionHeader */

  display: flex;
  flex-direction: column;
`

const S_CurrentWidget = styled.div`
  margin-top: ${clampedLerp(10, 80, ...gridRange, "px")};
  padding: ${doubler(6, tickerRange)} ${doubler(8, tickerRange)};

  width: ${doubler(250, tickerRange)};
  height: fit-content;

  background: ${({ theme }) => theme.header};
  border-radius: 8px;

  display: flex;
  align-items: center;
`

const S_AssetSearcher = styled.div`
  position: absolute;
  top: calc(100% + 10px);

  width: 100%;

  background: ${({ theme }) => theme.header};
  border-radius: 8px;

  z-index: 1;
`
