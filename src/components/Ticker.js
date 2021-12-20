import QuestionMarkSVG from "./SVGComponents/QuestionMarkSVG"
import styled from "styled-components"

export default function Ticker({ amount, ticker }) {
  return (
    <S_Ticker>
      <S_Value>{amount * ticker.bid}</S_Value>
      {ticker.image && <img src={ticker.image} />}
      {!ticker.image && <QuestionMarkSVG />}
    </S_Ticker>
  )
}

// STYLE
const minElementWidth = 300

const S_Ticker = styled.div`
  /* border: 1px solid black; */
  min-width: ${minElementWidth}px;
  padding: 20px;
  border-radius: 1rem;

  background: #ddd;

  display: flex;
  justify-content: right;
  align-items: center;

  svg {
    width: 40px;
    margin-left: 20px;
  }

  img {
    width: 40px;
    margin-left: 20px;
  }
`

const S_Value = styled.div`
  /* border: 1px solid black; */
  font-size: 20px;
`
