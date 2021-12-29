import styled, { keyframes } from "styled-components"

export default function FadeIn({
  duration = 500,
  delay = 0,
  children,
  ...delegated
}) {
  return (
    <S_FadeIn
      {...delegated}
      style={{
        ...(delegated.style || {}),
        animationDuration: duration + "ms",
        animationDelay: delay + "ms",
      }}
    >
      {children}
    </S_FadeIn>
  )
}

// STYLE
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const S_FadeIn = styled.div`
  animation-name: ${fadeIn};
  animation-fill-mode: backwards;
`
