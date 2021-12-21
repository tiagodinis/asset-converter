import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export default function FadeIn({
  duration = 500,
  delay = 0,
  children,
  ...delegated
}) {
  return (
    <Wrapper
      {...delegated}
      style={{
        ...(delegated.style || {}),
        animationDuration: duration + "ms",
        animationDelay: delay + "ms",
      }}
    >
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  animation-name: ${fadeIn};
  animation-fill-mode: backwards;
`
