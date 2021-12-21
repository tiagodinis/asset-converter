import QuestionMarkSVG from "./SVGComponents/QuestionMarkSVG"
import styled from "styled-components"
import { cleanAmount, formatAmount } from "../utilities/formatting"

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
      <div>
        {ticker.image && (
          <img src={ticker.image} alt={`${ticker.code} asset symbol`} />
        )}
        {!ticker.image && <QuestionMarkSVG />}
        {getTickerValue()}
      </div>
      {ticker.code}
    </S_Ticker>
  )
}

// STYLE
const minElementWidth = 300

const S_Ticker = styled.div`
  min-width: ${minElementWidth}px;
  padding: 20px;
  border-radius: 1rem;

  border: 2px solid ${({ theme }) => theme.tickerBorder};
  font-size: 20px;
  color: ${({ theme }) => theme.tickerFont};

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  svg {
    width: 40px;
    margin-right: 20px;
  }

  img {
    width: 40px;
    margin-right: 20px;
  }
`
