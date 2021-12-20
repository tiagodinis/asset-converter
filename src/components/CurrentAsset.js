import React from "react"
import SmallArrowSVG from "./SVGComponents/SmallArrowSVG"
import styled from "styled-components"

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
const S_CurrentAssetBtn = styled.button`
  margin-left: 16px;

  background: white;
  border: none;
  border-radius: 100vw;

  cursor: pointer;

  &:hover {
    background: #eceff2;
  }
`

const S_BtnContent = styled.div`
  padding: 8px 16px;

  display: flex;
  align-items: center;

  img {
    width: 28px;
    margin-right: 10px;
  }

  svg {
    width: 12px;
    margin-left: 6px;
    fill: #3c4a5bff;
    transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  }
`

const S_Code = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #3c4a5bff;
`
