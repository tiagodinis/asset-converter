import USDSVG from "./SVGComponents/USDSVG"
import styled from "styled-components"

export default function Ticker({ value }) {
  return (
    <S_Ticker>
      <S_Value>{value}</S_Value>
      <USDSVG />
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

  display: flex;
  justify-content: center;

  svg {
    width: 20px;
    margin-left: 20px;
  }
`

const S_Value = styled.div`
  /* border: 1px solid black; */
`
