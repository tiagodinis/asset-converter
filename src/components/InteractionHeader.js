import { useState } from "react"
import { useRef } from "react"

import CurrentAmount from "./CurrentAmount"
import CurrentAsset from "./CurrentAsset"
import { AssetSearcher } from "./AssetSearcher"
import styled from "styled-components"
import { useClickAway } from "react-use"

export default function InteractionHeader() {
  const [amount, setAmount] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const isHoveringCurrentAsset = useRef(null)
  const assetSearcherRef = useRef(null)

  // Close searcher unless hovering currentAsset (let that component take over)
  useClickAway(assetSearcherRef, () => {
    if (!isHoveringCurrentAsset.current) setIsOpen(false)
  })

  function setIsHoveringCurrentAsset(isHovering) {
    isHoveringCurrentAsset.current = isHovering
  }

  return (
    <S_Wrapper>
      <S_CurrentWidget>
        <CurrentAmount amount={amount} setAmount={setAmount} />
        <CurrentAsset
          setIsHoveringCurrentAsset={setIsHoveringCurrentAsset}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </S_CurrentWidget>
      {isOpen && (
        <AssetSearcher
          ref={assetSearcherRef}
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
