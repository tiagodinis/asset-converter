import React, { useState } from "react"
import { useDebounce } from "react-use"
import FadeIn from "./HOCs/FadeIn"
import MagnifyingGlassSVG from "./SVGComponents/MagnifyingGlassSVG"
import Throbber from "./Throbber"
import styled from "styled-components"
import { clampedLerp, doubler, tickerRange } from "../utilities/styledHelpers"

export const AssetSearcher = React.forwardRef(
  ({ assetMap, selectNewAsset }, ref) => {
    const [search, setSearch] = useState("")
    const [filteredAssets, setFilteredAssets] = useState(getFilteredAssets())

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

    return (
      <FadeIn>
        <FadeIn>
          <S_SearchBar>
            <MagnifyingGlassSVG />
            <S_Search
              ref={ref}
              placeholder="Search asset"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </S_SearchBar>
        </FadeIn>
        <S_AssetOptions>
          {filteredAssets &&
            filteredAssets.map((a) => (
              <FadeIn key={a.code}>
                <S_Asset onClick={() => selectNewAsset(a)}>
                  <S_AssetLeft>
                    <img src={a.image} alt={`${a.code} asset symbol`} />
                    <div>{a.name}</div>
                  </S_AssetLeft>
                  <S_AssetRight>{a.code}</S_AssetRight>
                </S_Asset>
              </FadeIn>
            ))}
          {!filteredAssets && (
            <S_ThrobberWrapper>
              <Throbber />
            </S_ThrobberWrapper>
          )}
        </S_AssetOptions>
      </FadeIn>
    )
  }
)

// STYLE
const _10 = doubler(5, tickerRange)
const _16 = doubler(8, tickerRange)
const _20 = doubler(10, tickerRange)

const S_SearchBar = styled.div`
  margin: ${_10}px;

  height: ${clampedLerp(40, 50, ...tickerRange, "px")};

  border-radius: ${_10}px;
  background: ${({ theme }) => theme.BG};

  display: flex;

  svg {
    width: 30px;
    margin-left: ${doubler(6, tickerRange)};
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
  margin: 10px 0px;

  max-height: 300px;

  overflow-y: auto;
`

const S_Asset = styled.div`
  padding: ${_16}px;

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
