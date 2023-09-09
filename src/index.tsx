import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { Provider } from "react-redux"
import { useFetchRegionsContracts, useWallet } from "shared/hooks"
import LiquidityPool from "ui/LiquidityPool"
import { selectMapMode, useSelector } from "redux-state"
import TestingPanel from "testing/components/TestingPanel"
import Referrals from "ui/Referrals"
import Footer from "ui/Footer"
import Nav from "ui/Nav"
import Claim from "ui/Claim"
import GlobalStyles from "ui/GlobalStyles"
import MapComponent from "ui/Map"
import {
  EthereumProviderContext,
  ethereumProvider,
} from "shared/hooks/contexts"
import web3Onboard from "shared/utils/web3Onboard"
import reduxStore from "./redux-state"

function DApp() {
  const mapMode = useSelector(selectMapMode)

  useWallet()
  useFetchRegionsContracts()

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
