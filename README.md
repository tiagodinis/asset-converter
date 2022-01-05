<h1 align="center">Asset Converter</h1>

<p align="center">Simple asset converter using <a href="https://uphold.com">Uphold's</a>
 api</p>

![side_by_side](https://user-images.githubusercontent.com/7140651/148213927-b0d0e2b0-06b4-4b15-8ca5-52fbc9f18391.png)


## MVP features

✔️ Searching and choosing asset for given amount

✔️ Background calls for available assets and pair rates that are cached

✔️ Debounced user interactions (changing asset amount & searching assets)

## Extras

✔️ List all available assets dynamically

✔️ Amount validation and formatting (trailing zeros, grouping, asset precision, ...)

✔️ Light and dark theme (preference stored in local storage)

✔️ Responsiveness

✔️ Visual lazy loading of asset pairs on scroll

✔️ Scroll skew effect on small screens

# Installation

To run the app locally

    git clone https://github.com/tiagodinis/asset-converter
    npm run install-deps
    npm run dev
