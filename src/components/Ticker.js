import { cleanAmount, formatAmount } from "../utilities/amountFormatting"
import FadeIn from "./HOCs/FadeIn"
import QuestionMarkSVG from "./SVGComponents/QuestionMarkSVG"
import styled from "styled-components"
import {
  clampedLerp,
  doubler,
  minTickerWidth,
  tickerRange,
} from "../utilities/styledHelpers"

export default function Ticker({ amount, ticker }) {
  function getTickerValue() {
    let res = amount * ticker.bid
    if (amount) {
      let precision = ticker.formatting?.precision
      res = cleanAmount(res.toString(), precision ? precision : Infinity)
      res = formatAmount(res)
    }

    return res
  }

  return (
    <S_Ticker>
      <S_Left>
        {ticker.image && (
          <FadeIn>
            <img src={ticker.image} alt={`${ticker.code} asset symbol`} />
          </FadeIn>
        )}
        {!ticker.image && (
          <div>
            <QuestionMarkSVG />
          </div>
        )}
        <S_TickerValue>{getTickerValue()}</S_TickerValue>
      </S_Left>
      {ticker.code}
    </S_Ticker>
  )
}

// STYLE
const padding = doubler(10, tickerRange)
const iconDims = doubler(25, tickerRange)

const S_Ticker = styled.div`
  min-width: ${minTickerWidth}px;
  height: ${clampedLerp(60, 84, ...tickerRange, "px")};
  padding: 0px ${padding}px;
  border-radius: 1rem;

  border: 2px solid ${({ theme }) => theme.tickerBorder};
  font-size: ${clampedLerp(16, 20, ...tickerRange, "px")};
  color: ${({ theme }) => theme.tickerFont};

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const S_Left = styled.div`
  min-width: 0px;

  margin-right: ${padding}px;

  display: flex;
  align-items: center;

  svg {
    width: ${iconDims}px;
    height: ${iconDims}px;
    margin-right: ${padding}px;
  }

  img {
    width: ${iconDims}px;
    height: ${iconDims}px;
    margin-right: ${padding}px;
  }
`

const S_TickerValue = styled.div`
  min-width: 0px;
  overflow-wrap: break-word;
`
