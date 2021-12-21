import React, { useRef } from "react"
import styled from "styled-components"
import { cleanAmount, formatAmount } from "../utilities/amountFormatting"
import { tickerRange } from "../styles/styledConstants"
import { clampedLerp } from "../utilities/styledHelpers"

export const CurrentAmount = React.forwardRef(
  ({ asset, amount, setAmount }, ref) => {
    const formattedAmount = useRef(formatAmount(amount))

    function handleAmountChange(e) {
      let cleanedStr = cleanAmount(e.target.value, asset.formatting.precision)
      setAmount(cleanedStr)

      formattedAmount.current = formatAmount(cleanedStr)
    }

    return (
      <S_Amount
        ref={ref}
        placeholder="0"
        value={formattedAmount.current}
        onChange={handleAmountChange}
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
