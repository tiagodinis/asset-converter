export function cleanAmount(str, precision) {
  // Only valid chars
  let current = str.replace(/[^0-9.]/g, "")
  let prev = current

  // Trim left zeros
  // * Add 1 if "." as first char
  // * Keep 1 if only 1 zero
  current = ""
  let i = 0
  for (; prev[i] === "0" && i < prev.length; ++i);
  if (prev[0] === "." || prev[0] === "0") current = "0"
  current += prev.slice(i)

  // No more than 1 "."
  for (let i = 0, nrDot = 0; i < current.length; ++i) {
    if (current[i] === ".") {
      nrDot++
      if (nrDot > 1) current = current.slice(0, i)
    }
  }

  let [left, right] = current.split(".")

  // Round to precision
  if (!right) right = ""
  else if (precision < right.length)
    right = parseFloat("0." + right)
      .toFixed(precision)
      .slice(2)

  return left + (current.includes(".") ? "." : "") + right
}

export function formatAmount(str) {
  let [left, right] = str.split(".")
  if (!right) right = ""

  // Insert grouping char
  let groupedLeft = ""
  for (let i = 0; i < left.length; ++i) {
    let charLeft = left.length - i
    groupedLeft += left[i]
    if (charLeft % 3 === 1 && charLeft > 1) groupedLeft += ","
  }

  return groupedLeft + (str.includes(".") ? "." : "") + right
}
