import QuestionMarkSVG from "./SVGComponents/QuestionMarkSVG"
import styled from "styled-components"

export default function Ticker({ amount, ticker }) {
  return (
    <S_Ticker>
      <div>
        {ticker.image && (
          <img src={ticker.image} alt={`${ticker.code} asset symbol`} />
        )}
        {!ticker.image && <QuestionMarkSVG />}
        {amount * ticker.bid}
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

  background: #ddd;
  font-size: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  svg {
    width: 40px;
    margin-left: 20px;
  }

  img {
    width: 40px;
    margin-right: 20px;
  }
`
