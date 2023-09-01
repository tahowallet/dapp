import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import Referrals from "./Referrals"
import {
  EthereumProviderContext,
  ethereumProvider,
} from "./shared/hooks/contexts"
import Footer from "./Footer"
import Nav from "./Nav"
import Claim from "./Claim"
import GlobalStyles from "./GlobalStyles"
import MapComponent from "./Map"
import web3Onboard from "./web3Onboard"

function DApp() {
  return (
    <EthereumProviderContext.Provider value={ethereumProvider}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <GlobalStyles />
        <MapComponent />
        <Router>
          <Nav />
          <Switch>
            <Route path="/claim">
              <Claim />
            </Route>
            <Route path="/referrals">
              <Referrals />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Web3OnboardProvider>
    </EthereumProviderContext.Provider>
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
