import React from "react"
import SmallArrowSVG from "./SVGComponents/SmallArrowSVG"
import styled from "styled-components"
import { clampedLerp, doubler, tickerRange } from "../utilities/styledHelpers"

export default function CurrentAsset({
  asset,
  isOpen,
  setIsOpen,
  isHoveringCurrentAsset,
}) {
  return (
    <S_CurrentAssetBtn
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => (isHoveringCurrentAsset.current = true)}
      onMouseLeave={() => (isHoveringCurrentAsset.current = false)}
    >
      <S_BtnContent isOpen={isOpen}>
        <img src={asset.image} alt={`${asset.code} asset symbol`} />
        <S_Code>{asset.code}</S_Code>
        <SmallArrowSVG />
      </S_BtnContent>
    </S_CurrentAssetBtn>
  )
}

// STYLE
const iconDims = clampedLerp(18, 28, ...tickerRange, "px")
const _16 = doubler(8, tickerRange)

const S_CurrentAssetBtn = styled.button`
  margin-left: ${_16}px;

  background: ${({ theme }) => theme.BG};
  border: none;
  border-radius: 100vw;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.assetHover};
  }

  transition: 0.1s;
`

const S_BtnContent = styled.div`
  padding: ${doubler(4, tickerRange)} ${_16}px;

  display: flex;
  align-items: center;

  img {
    width: ${iconDims}px;
    height: ${iconDims}px;
    margin-right: ${doubler(5, tickerRange)};
  }

  svg {
    width: ${clampedLerp(8, 12, ...tickerRange, "px")};
    margin-left: 6px;
    fill: ${({ theme }) => theme.tickerFont};
    transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
    transition: 0.2s;
  }
`

const S_Code = styled.div`
  font-size: ${clampedLerp(14, 18, ...tickerRange, "px")};
  font-weight: 500;
  color: ${({ theme }) => theme.tickerFont};
`
