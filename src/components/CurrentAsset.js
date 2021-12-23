import React from "react"
import SmallArrowSVG from "./SVGComponents/SmallArrowSVG"
import styled from "styled-components"
import { tickerRange } from "../styles/styledConstants"
import { clampedLerp } from "../utilities/styledHelpers"

export default function CurrentAsset({
  asset,
  isOpen,
  setIsOpen,
  setIsHoveringCurrentAsset,
}) {
  return (
    <S_CurrentAssetBtn
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsHoveringCurrentAsset(true)}
      onMouseLeave={() => setIsHoveringCurrentAsset(false)}
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
const iconDim = clampedLerp(18, 28, ...tickerRange, "px")

const S_CurrentAssetBtn = styled.button`
  margin-left: ${clampedLerp(8, 16, ...tickerRange, "px")};

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
  padding: ${clampedLerp(4, 8, ...tickerRange, "px")}
    ${clampedLerp(8, 16, ...tickerRange, "px")};

  display: flex;
  align-items: center;

  img {
    width: ${iconDim}px;
    height: ${iconDim}px;
    margin-right: ${clampedLerp(5, 10, ...tickerRange, "px")};
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
