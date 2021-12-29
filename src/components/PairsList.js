import React, { useRef, useEffect, useState } from "react"
import { usePairs } from "../hooks/upholdData"
import { useWindowSize } from "react-use"
import FadeIn from "./HOCs/FadeIn"
import Ticker from "./Ticker"
import Throbber from "./Throbber"
import styled from "styled-components"
import {
  clampedLerp,
  minTickerWidth,
  gridRange,
  tickerRange,
  doubler,
} from "../utilities/styledHelpers"

const nrPairsInBlock = 40
const pairFadeInDelay = 30
const maxYSkew = 2

export default function PairsList({ amount, assetMap, asset }) {
  const pairs = usePairs(assetMap, asset)
  const observer = useRef()
  const showMoreTriggerRef = useRef()
  const [nrPairs, setNrPairs] = useState(nrPairsInBlock)
  const gridRef = useRef()
  const skewAnimRef = useRef()
  const prevPageY = useRef(window.pageYOffset)
  const { width } = useWindowSize()

  // Visual lazy loading of asset pairs on scroll
  useEffect(() => {
    if (!pairs) return

    setNrPairs(nrPairsInBlock)

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting)
        setNrPairs((prev) => Math.min(prev + nrPairsInBlock, pairs.length))
    })

    observer.current.observe(showMoreTriggerRef.current)

    return () => observer.current.disconnect()
  }, [pairs])

  // Skew animation when scrolling small screens
  useEffect(() => {
    function step() {
      const newPageY = window.pageYOffset
      const diff = newPageY - prevPageY.current
      prevPageY.current = newPageY
      const skew = Math.max(Math.min(diff * 0.35, maxYSkew), -maxYSkew)

      gridRef.current.style.transform = `skewY(${skew}deg)`

      skewAnimRef.current = requestAnimationFrame(step)
    }

    if (skewAnimRef.current) cancelAnimationFrame(skewAnimRef.current)
    if (width < tickerRange[1])
      skewAnimRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(skewAnimRef.current)
  }, [width])

  const getFadeInDelay = (index) =>
    pairFadeInDelay * Math.max(0, index - (nrPairs - nrPairsInBlock))

  return (
    <S_Grid ref={gridRef}>
      {pairs &&
        pairs.slice(0, nrPairs).map((t, index) => (
          <FadeIn key={t.code} duration={1000} delay={getFadeInDelay(index)}>
            <Ticker amount={amount} ticker={t} />
          </FadeIn>
        ))}
      {pairs && <S_ShowMoreTrigger ref={showMoreTriggerRef} />}
      {!pairs && (
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

  margin: ${doubler(20, gridRange)} 0px;
  width: ${clampedLerp(300, 1250, ...gridRange, "px")};

  transition: transform 0.5s cubic-bezier(0, 0, 0, 1);
  will-change: transform;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${minTickerWidth}px, 1fr));
  grid-gap: ${doubler(12, gridRange)};
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
