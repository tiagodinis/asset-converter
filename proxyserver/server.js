const express = require("express")
const app = express()
const fetch = require("cross-fetch")
const cors = require("cors")

app.use(cors())

const targetApi = "https://api-sandbox.uphold.com/v0"

function setProxyRequest(uri) {
  app.get(uri, async (req, res) => {
    const range = req.headers.range
    let options = {}
    if (range) options = { headers: { Range: range } }
    const response = await fetch(targetApi + uri, options)
    res.json(await response.json())
  })
}

setProxyRequest("/assets")
setProxyRequest("/ticker/USD")

app.listen(3001, () => {
  console.log("Listening on port 3001")
})
