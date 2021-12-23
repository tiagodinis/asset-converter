import React, { useRef, useEffect, useState } from "react"
import { useWindowSize } from "react-use"
import styled from "styled-components"
import { minTickerWidth, gridRange } from "../styles/styledConstants"
import { clampedLerp } from "../utilities/styledHelpers"
import FadeIn from "./HOCs/FadeIn"
import Throbber from "./Throbber"
import Ticker from "./Ticker"

const block = 40
const tickerFadeInDelay = 30
const maxYSkew = 2

export default function PairsList({ amount, tickers }) {
  const { width } = useWindowSize()
  const gridRef = useRef()
  const skewAnimRef = useRef()
  const prevPageY = useRef(window.pageYOffset)
  const observer = useRef()
  const showMoreTriggerRef = useRef()
  const [nrTickers, setNrTickers] = useState(block)

  useEffect(() => {
    if (!tickers) return

    setNrTickers(block)

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting)
        setNrTickers((prev) => Math.min(prev + block, tickers.length))
    })

    observer.current.observe(showMoreTriggerRef.current)

    return () => observer.current.disconnect()
  }, [tickers])

  function step() {
    const newPageY = window.pageYOffset
    const diff = newPageY - prevPageY.current
    prevPageY.current = newPageY
    const skew = Math.max(Math.min(diff * 0.35, maxYSkew), -maxYSkew)

    gridRef.current.style.transform = `skewY(${skew}deg)`

    skewAnimRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (skewAnimRef.current) cancelAnimationFrame(skewAnimRef.current)
    if (width < 700) skewAnimRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(skewAnimRef.current)
  }, [width])

  const getFadeInDelay = (index) =>
    tickerFadeInDelay * Math.max(0, index - (nrTickers - block))

  return (
    <S_Grid ref={gridRef}>
      {tickers && (
        <>
          {tickers.slice(0, nrTickers).map((t, index) => (
            <FadeIn key={t.code} duration={1000} delay={getFadeInDelay(index)}>
              <Ticker amount={amount} ticker={t} />
            </FadeIn>
          ))}
          <S_ShowMoreTrigger ref={showMoreTriggerRef} />
        </>
      )}
      {!tickers && (
        <S_ThrobberWrapper>
          <Throbber />
        </S_ThrobberWrapper>
      )}
    </S_Grid>
  )
}

// STYLE
const S_Grid = styled.div`
  position: relative;

  margin: ${clampedLerp(20, 40, ...gridRange, "px")} 0px;
  width: ${clampedLerp(300, 1250, ...gridRange, "px")};

  transition: transform 0.5s cubic-bezier(0, 0, 0, 1);
  will-change: transform;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minTickerWidth}px, 1fr));
  grid-gap: ${clampedLerp(12, 24, ...gridRange, "px")};
`

const S_ShowMoreTrigger = styled.div`
  position: absolute;
  top: calc(100% - 400px);
  left: calc(50%);
`

const S_ThrobberWrapper = styled.div`
  position: absolute;
  left: 50%;
`
