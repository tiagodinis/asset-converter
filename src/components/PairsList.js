import React from "react"
import styled from "styled-components"
import Ticker from "./Ticker"

export default function PairsList() {
  return (
    <S_Grid>
      {Array(100)
        .fill(0.000123012)
        .map((v, index) => (
          <Ticker key={index} value={v} />
        ))}
    </S_Grid>
  )
}

// STYLE
const minElementWidth = 300

const S_Grid = styled.div`
  /* border: 1px solid black; */

  margin-top: 20px;
  width: min(1000px, 80%);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minElementWidth}px, 1fr));
  grid-gap: 1rem;
`
