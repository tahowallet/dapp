import React, { useLayoutEffect } from "react"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Footer from "./Footer"
import Nav from "./Nav"
import Claim from "./Claim"
import GlobalStyles from "./GlobalStyles"
import MapComponent from "./Map"

import backgroundImg from "./public/dapp_map_bg.webp"

function DApp() {
  const [assetsLoaded, setAssetsLoaded] = React.useState(false)

  useLayoutEffect(() => {
    const assets = [backgroundImg]
    let loaded = 0
    assets.forEach((asset) => {
      const img = new Image()
      img.src = asset
      img.onload = () => {
        loaded += 1
        if (loaded === assets.length) {
          setAssetsLoaded(true)
        }
      }
    })
  }, [])

  if (!assetsLoaded) {
    return null
  }

  return (
    <ThirdwebProvider>
      <GlobalStyles />
      <MapComponent />
      <Router>
        <Nav />
        <Switch>
          <Route path="/claim">
            <Claim />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThirdwebProvider>
  )
}

const root = document.getElementById("root")

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DApp />
    </React.StrictMode>
  )
}
