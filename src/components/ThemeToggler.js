import React, { useState } from "react"
import lightOff from "../audio/lightOff.mp3"
import lightOn from "../audio/lightOn.mp3"
import SunSVG from "./SVGComponents/SunSVG"
import MoonSVG from "./SVGComponents/MoonSVG"
import { Theme } from "../styles/themes"
import styled, { useTheme } from "styled-components"

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
const ToggleThemeButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  width: 50px;
  height: 50px;

  padding: 10px;

  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.tickerFont};
  background-color: ${({ theme }) => theme.BG};

  cursor: pointer;
`
