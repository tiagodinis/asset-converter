const express = require("express")
const app = express()
const fetch = require("cross-fetch")
const cors = require("cors")

app.use(cors())

const targetApi = "https://api-sandbox.uphold.com/v0"

function setProxyRequest(path) {
  app.get(path, async (req, res) => {
    let options = {}
    if (req.headers.range) options = { headers: { Range: req.headers.range } }
    const response = await fetch(targetApi + req.path, options)
    res.json(await response.json())
  })
}

setProxyRequest("/assets")
setProxyRequest("/ticker/:currency")

app.listen(3001, () => {
  console.log("Listening on port 3001")
})
