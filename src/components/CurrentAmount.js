import styled from "styled-components"

export default function CurrentAmount({ amount, setAmount }) {
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
    <S_Amount placeholder="0.00" value={amount} onChange={handleAmountChange} />
  )
}

// STYLE
const S_Amount = styled.input`
  width: 300px;

  outline: none;
  border: none;
  background: #f5f9fcff;

  font-size: 44px;
  color: #3c4a5bff;
`
