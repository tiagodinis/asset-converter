import React from "react"
import MagnifyingGlassSVG from "./SVGComponents/MagnifyingGlassSVG"
import styled from "styled-components"

export const AssetSearcher = React.forwardRef(
  ({ assets, selectNewAsset, search, setSearch }, ref) => {
    function handleSearchChange(e) {
      setSearch(e.target.value)
    }

    return (
      <>
        <S_SearchBar>
          <MagnifyingGlassSVG />
          <S_Search
            ref={ref}
            placeholder="Search asset"
            value={search}
            onChange={handleSearchChange}
          />
        </S_SearchBar>

        <S_AssetOptions>
          {assets &&
            assets.map((a) => (
              <S_Asset key={a.code} onClick={() => selectNewAsset(a)}>
                <S_AssetLeft>
                  <img src={a.image} alt={`${a.code} asset symbol`} />
                  <div>{a.name}</div>
                </S_AssetLeft>
                <S_AssetRight>{a.code}</S_AssetRight>
              </S_Asset>
            ))}
        </S_AssetOptions>
      </>
    )
  }
)

// STYLE
const S_SearchBar = styled.div`
  margin: 10px;

  height: 50px;

  border-radius: 10px;
  background: ${({ theme }) => theme.BG};

  display: flex;

  svg {
    width: 30px;
    margin-left: 12px;
    fill: ${({ theme }) => theme.tickerFont};
  }
`

const S_Search = styled.input`
  outline: none;
  border: none;

  background: ${({ theme }) => theme.BG};
  font-size: 14px;
  color: ${({ theme }) => theme.tickerFont};

  margin: 10px;
  flex-grow: 1;
`

const S_AssetOptions = styled.div`
  margin: 10px 0px;

  max-height: 300px;

  overflow-y: auto;
`

const S_Asset = styled.div`
  padding: 10px 15px;

  cursor: pointer;

  color: ${({ theme }) => theme.headerFont};

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 40px;
    margin-right: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.assetHover};
  }
`

const S_AssetLeft = styled.div`
  font-size: 26px;
  font-weight: 700;

  display: flex;
  align-items: center;
`

const S_AssetRight = styled.div`
  font-size: 18px;
  font-weight: 500;
`
