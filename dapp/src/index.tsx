import React from "react"
import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import tahoWallet from "./integration/wallet"
import Footer from "./Footer"
import Nav from "./Nav"
import Claim from "./Claim"
import GlobalStyles from "./GlobalStyles"
import MapComponent from "./Map"

function DApp() {
  return (
    <ThirdwebProvider
      supportedWallets={[tahoWallet(), metamaskWallet(), walletConnect()]}
    >
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
