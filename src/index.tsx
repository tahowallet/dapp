import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { Provider } from "react-redux"
import {
  useBalanceFetch,
  useConnect,
  useGameDataFetch,
  useGameLoadDataFetch,
  useWallet,
  useWalletChange,
  useWalletOnboarding,
} from "shared/hooks"
import LiquidityPool from "ui/LiquidityPool"
import {
  selectHasLoadedRealmData,
  selectHasLoadedSeasonInfo,
  selectIslandMode,
  setIslandMode,
  useDappDispatch,
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
import FullPageLoader from "shared/components/FullPageLoader"
import MobileScreen from "ui/MobileScreen"
import reduxStore from "./redux-state"

function DApp() {
  const islandMode = useDappSelector(selectIslandMode)
  const dispatch = useDappDispatch()
  const { isConnected } = useConnect()
  const { walletOnboarded } = useWalletOnboarding()

  const hasLoadedRealmData = useDappSelector(selectHasLoadedRealmData)
  const hasLoadedSeasonInfo = useDappSelector(selectHasLoadedSeasonInfo)

  useEffect(() => {
    if (process.env.USE_TENDERLY_FORK === "true") {
      dispatch(setIslandMode("default"))
    }
  }, [dispatch])

  useWallet()
  useGameLoadDataFetch()
  useBalanceFetch()
  useWalletChange()
  useGameDataFetch()

  return (
    <>
      <GlobalStyles />
      <MobileScreen />
      <Router>
        {(!walletOnboarded || !isConnected) && (
          <Onboarding isTeaser={islandMode === "teaser"} />
        )}
        {walletOnboarded && isConnected && (
          <>
            <FullPageLoader
              loaded={hasLoadedRealmData && hasLoadedSeasonInfo}
            />
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
  if (process.env.SKIP_REACT_STRICT_MODE === "true") {
    ReactDOM.createRoot(root).render(<DAppProviders />)
  } else {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <DAppProviders />
      </React.StrictMode>
    )
  }
}
