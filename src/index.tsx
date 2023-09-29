import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { Provider } from "react-redux"
import {
  useBalanceFetch,
  useConnect,
  useFetchRealmsContracts,
  useWallet,
} from "shared/hooks"
import LiquidityPool from "ui/LiquidityPool"
import {
  selectIsWalletOnboarded,
  selectIslandMode,
  useDappSelector,
} from "redux-state"
import TestingPanel from "testing/components/TestingPanel"
import Referrals from "ui/Referrals"
import Footer from "ui/Footer"
import Nav from "ui/Nav"
import Claim from "ui/Claim"
import GlobalStyles from "ui/GlobalStyles"
import IslandComponent from "ui/Island"
import web3Onboard from "shared/utils/web3Onboard"
import { ROUTES } from "shared/constants"
import Onboarding from "ui/Onboarding"
import reduxStore from "./redux-state"

function DApp() {
  const islandMode = useDappSelector(selectIslandMode)
  const isOnboarded = useDappSelector(selectIsWalletOnboarded)

  const { isConnected } = useConnect()

  useWallet()
  useBalanceFetch()
  useFetchRealmsContracts()

  return (
    <>
      <GlobalStyles />
      <Router>
        {!isOnboarded && <Onboarding />}
        {isOnboarded && isConnected && (
          <>
            <IslandComponent />
            <TestingPanel />
            {islandMode === "default" && <Nav />}
            <Switch>
              <Route path={ROUTES.CLAIM.HOME}>
                <Claim />
              </Route>
              <Route path={ROUTES.REFERRALS}>
                <Referrals />
              </Route>
              {/* TODO should be removed or defined later */}
              <Route path={ROUTES.LP}>
                <LiquidityPool />
              </Route>
            </Switch>
            <Footer />
          </>
        )}
      </Router>
    </>
  )
}

function DAppProviders() {
  return (
    <Provider store={reduxStore}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <DApp />
      </Web3OnboardProvider>
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
