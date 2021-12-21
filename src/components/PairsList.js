import React from "react"
import styled from "styled-components"
import Ticker from "./Ticker"

export default function PairsList({ amount, tickers }) {
  return (
    <S_Grid>
      {tickers &&
        tickers.map((t) => <Ticker key={t.code} amount={amount} ticker={t} />)}
    </S_Grid>
  )
}

// STYLE
const minElementWidth = 300

const S_Grid = styled.div`
  /* border: 1px solid black; */

  margin: 40px 0px;
  width: min(1000px, 80%);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minElementWidth}px, 1fr));
  grid-gap: 1rem;
`
