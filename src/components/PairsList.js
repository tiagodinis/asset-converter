import React from "react"
import styled from "styled-components"
import Throbber from "./Throbber"
import Ticker from "./Ticker"

export default function PairsList({ amount, tickers }) {
  return tickers ? (
    <S_Grid>
      {tickers.map((t) => (
        <Ticker key={t.code} amount={amount} ticker={t} />
      ))}
    </S_Grid>
  ) : (
    <S_ThrobberWrapper>
      <Throbber />
    </S_ThrobberWrapper>
  )
}

// STYLE
const minElementWidth = 300

const topMargin = 40

const S_ThrobberWrapper = styled.div`
  margin: ${topMargin}px 0px;
`

const S_Grid = styled.div`
  margin: ${topMargin}px 0px;
  width: min(1000px, 80%);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minElementWidth}px, 1fr));
  grid-gap: 1rem;
`
