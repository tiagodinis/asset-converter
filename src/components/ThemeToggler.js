import React, { useState } from "react"
import lightOff from "../audio/lightOff.mp3"
import lightOn from "../audio/lightOn.mp3"
import SunSVG from "./SVGComponents/SunSVG"
import MoonSVG from "./SVGComponents/MoonSVG"
import { Theme } from "../styles/themes"
import styled, { useTheme } from "styled-components"
import { clampedLerp, doubler, tickerRange } from "../utilities/styledHelpers"

export default function ThemeToggler({ setTheme }) {
  const [toDarkSound] = useState(() => new Audio(lightOff))
  const [toLightSound] = useState(() => new Audio(lightOn))
  const theme = useTheme()

  function toggleTheme() {
    theme.id === Theme.Light ? toDarkSound.play() : toLightSound.play()
    setTheme(theme.id === Theme.Light ? Theme.Dark : Theme.Light)
  }

  return (
    <ToggleThemeButton onClick={toggleTheme}>
      {theme.id === Theme.Light && (
        <MoonSVG fill={theme.BG} stroke={theme.tickerFont} />
      )}
      {theme.id === Theme.Dark && (
        <SunSVG fill={theme.BG} stroke={theme.tickerFont} />
      )}
    </ToggleThemeButton>
  )
}

// STYLE
const buttonDims = clampedLerp(25, 50, ...tickerRange, "px")

const ToggleThemeButton = styled.div`
  position: absolute;
  top: 16px;
  right: ${doubler(8, tickerRange)};

  width: ${buttonDims}px;
  height: ${buttonDims}px;

  padding: ${doubler(5, tickerRange)};

  border-radius: 50%;
  border-width: ${clampedLerp(1, 3, ...tickerRange, "px")};
  border-style: solid;
  border-color: ${({ theme }) => theme.tickerFont};
  background-color: ${({ theme }) => theme.BG};

  cursor: pointer;
`
