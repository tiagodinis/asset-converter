import React from "react"
import styled from "styled-components"
import { minTickerWidth, gridRange } from "../styles/styledConstants"
import { clampedLerp } from "../utilities/styledHelpers"
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
const topMargin = clampedLerp(20, 40, ...gridRange, "px")

const S_ThrobberWrapper = styled.div`
  margin: ${topMargin}px 0px;
`

const S_Grid = styled.div`
  margin: ${topMargin}px 0px;
  width: ${clampedLerp(300, 1250, ...gridRange, "px")};

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minTickerWidth}px, 1fr));
  grid-gap: ${clampedLerp(12, 24, ...gridRange, "px")};
`
