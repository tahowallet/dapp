import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { Provider, useSelector } from "react-redux"
import { useWallet } from "shared/hooks"
import LiquidityPool from "LiquidityPool"
import { selectMapMode } from "redux-state/selectors/map"
import TestingPanel from "testing/components/TestingPanel"
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
import reduxStore from "./redux-state"

function DApp() {
  const mapMode = useSelector(selectMapMode)

  useWallet()

  return (
    <>
      <GlobalStyles />
      <Router>
        <MapComponent />
        <TestingPanel />
        {mapMode === "default" && <Nav />}
        <Switch>
          <Route path="/claim">
            <Claim />
          </Route>
          <Route path="/referrals">
            <Referrals />
          </Route>
          {/* TODO should be removed or defined later */}
          <Route path="/lp">
            <LiquidityPool />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  )
}
function DAppProviders() {
  return (
    <Provider store={reduxStore}>
      <EthereumProviderContext.Provider value={ethereumProvider}>
        <Web3OnboardProvider web3Onboard={web3Onboard}>
          <DApp />
        </Web3OnboardProvider>
      </EthereumProviderContext.Provider>
    </Provider>
  )
}

const root = document.getElementById("root")

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DAppProviders />
    </React.StrictMode>
  )
}
