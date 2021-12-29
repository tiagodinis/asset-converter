import React, { useState, useEffect } from "react"
import { useDebounce } from "react-use"
import { cleanAmount, formatAmount } from "../utilities/amountFormatting"
import { clampedLerp, tickerRange } from "../utilities/styledHelpers"
import styled from "styled-components"

export const CurrentAmount = React.forwardRef(
  ({ precision, setDebouncedAmount }, ref) => {
    const [amount, setAmount] = useState("")

    useDebounce(() => setDebouncedAmount(amount), 250, [amount])

    useEffect(
      () => setAmount(cleanAmount(amount, precision)),
      [amount, precision]
    )

    return (
      <S_Amount
        ref={ref}
        placeholder="0"
        value={formatAmount(amount)}
        onChange={(e) => setAmount(cleanAmount(e.target.value, precision))}
      />
    )
  }
)

// STYLE
const S_Amount = styled.input`
  width: 100%;

  outline: none;
  border: none;
  background: ${({ theme }) => theme.header};

  font-size: ${clampedLerp(16, 44, ...tickerRange, "px")};
  color: ${({ theme }) => theme.headerFont};
`
