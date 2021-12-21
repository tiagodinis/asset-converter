import styled, { keyframes } from "styled-components"
import LoadingCircleSVG from "./SVGComponents/LoadingCircleSVG"

export default function Throbber() {
  return (
    <S_Throbber>
      <LoadingCircleSVG />
    </S_Throbber>
  )
}

// STYLE
const LoadRotate = keyframes`
 0% {
    transform: rotate(0deg);
 }
 100% {
  transform: rotate(360deg);
 }
`

const S_Throbber = styled.div`
  margin: auto;

  width: 40px;
  height: 42px;

  animation: ${LoadRotate} 1s infinite linear;

  svg {
    fill: ${({ theme }) => theme.loadingCircle};
  }
`
