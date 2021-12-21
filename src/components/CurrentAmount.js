import React from "react"
import styled from "styled-components"

export const CurrentAmount = React.forwardRef(
  ({ asset, amount, setAmount }, ref) => {
    function handleAmountChange(e) {
      let enteredAmount = e.target.value
      let newAmount = ""
      let dotPos
      for (let i = 0; i < enteredAmount.length; ++i) {
        let char = enteredAmount[i]
        if (char >= "0" && char <= "9") newAmount += char
        if (char === "." && !dotPos) {
          dotPos = i
          newAmount += char
        }
      }

      setAmount(newAmount)
    }

    return (
      <S_Amount
        ref={ref}
        placeholder="0.00"
        value={amount}
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
  background: #f5f9fcff;

  font-size: 44px;
  color: #3c4a5bff;
`
