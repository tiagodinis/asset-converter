import React from "react"
import MagnifyingGlassSVG from "./SVGComponents/MagnifyingGlassSVG"
import styled from "styled-components"
import Throbber from "./Throbber"
import { tickerRange } from "../styles/styledConstants"
import { clampedLerp } from "../utilities/styledHelpers"
import FadeIn from "./HOCs/FadeIn"

export const AssetSearcher = React.forwardRef(
  ({ assets, selectNewAsset, search, setSearch }, ref) => {
    function handleSearchChange(e) {
      setSearch(e.target.value)
    }

    return (
      <>
        <FadeIn>
          <S_SearchBar>
            <MagnifyingGlassSVG />
            <S_Search
              ref={ref}
              placeholder="Search asset"
              value={search}
              onChange={handleSearchChange}
            />
          </S_SearchBar>
        </FadeIn>
        <S_AssetOptions>
          {assets &&
            assets.map((a) => (
              <FadeIn>
                <S_Asset key={a.code} onClick={() => selectNewAsset(a)}>
                  <S_AssetLeft>
                    <img src={a.image} alt={`${a.code} asset symbol`} />
                    <div>{a.name}</div>
                  </S_AssetLeft>
                  <S_AssetRight>{a.code}</S_AssetRight>
                </S_Asset>
              </FadeIn>
            ))}
          {!assets && (
            <S_ThrobberWrapper>
              <Throbber />
            </S_ThrobberWrapper>
          )}
        </S_AssetOptions>
      </>
    )
  }
)

// STYLE
const _10 = clampedLerp(5, 10, ...tickerRange, "px")
const _20 = clampedLerp(10, 20, ...tickerRange, "px")

const S_SearchBar = styled.div`
  margin: ${_10}px;

  height: ${clampedLerp(40, 50, ...tickerRange, "px")};

  border-radius: ${_10}px;
  background: ${({ theme }) => theme.BG};

  display: flex;

  svg {
    width: 30px;
    margin-left: ${clampedLerp(6, 12, ...tickerRange, "px")};
    fill: ${({ theme }) => theme.tickerFont};
  }
`

const S_Search = styled.input`
  outline: none;
  border: none;

  background: ${({ theme }) => theme.BG};
  font-size: 14px;
  color: ${({ theme }) => theme.tickerFont};

  margin: ${_10}px;
  flex-grow: 1;
`

const S_AssetOptions = styled.div`
  margin: ${_10}px 0px;

  max-height: 300px;

  overflow-y: auto;
`

const S_Asset = styled.div`
  padding: ${_10}px 15px;

  cursor: pointer;

  color: ${({ theme }) => theme.headerFont};

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: ${clampedLerp(30, 40, ...tickerRange, "px")};
    margin-right: ${_20}px;
  }

  &:hover {
    background: ${({ theme }) => theme.assetHover};
  }
`

const S_AssetLeft = styled.div`
  font-size: ${clampedLerp(18, 26, ...tickerRange, "px")};
  font-weight: 700;

  display: flex;
  align-items: center;
`

const S_AssetRight = styled.div`
  font-size: 18px;
  font-weight: 500;
`

const S_ThrobberWrapper = styled.div`
  padding: ${_20}px;
`
