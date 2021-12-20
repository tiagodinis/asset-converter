import React from "react"
import MagnifyingGlassSVG from "./SVGComponents/MagnifyingGlassSVG"
import styled from "styled-components"

export const AssetSearcher = React.forwardRef(({ search, setSearch }, ref) => {
  function handleSearchChange(e) {
    setSearch(e.target.value)
  }

  return (
    <S_AssetSearcher ref={ref}>
      <S_SearchBar>
        <MagnifyingGlassSVG />
        <S_Search
          placeholder="Search asset"
          value={search}
          onChange={handleSearchChange}
        />
      </S_SearchBar>
      <S_AssetOptions>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <SAsset key={n}>{n}</SAsset>
        ))}
      </S_AssetOptions>
    </S_AssetSearcher>
  )
})

// STYLE
const S_AssetSearcher = styled.div`
  position: absolute;
  top: calc(100% + 20px);

  width: 100%;

  background: #f5f9fcff;
  border-radius: 8px;
`

const S_SearchBar = styled.div`
  margin: 10px;

  height: 50px;

  border-radius: 10px;
  background: white;

  display: flex;

  svg {
    width: 30px;
    margin-left: 12px;
  }
`

const S_Search = styled.input`
  outline: none;
  border: none;

  margin: 10px;
  flex-grow: 1;
`

const S_AssetOptions = styled.div`
  margin: 10px 0px;

  max-height: 300px;

  overflow-y: auto;
`

const SAsset = styled.div`
  padding: 10px 15px;

  &:hover {
    background: white;
  }
`
