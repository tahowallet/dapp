import React, { ReactNode, useEffect } from "react"
import ReactDOM from "react-dom/client"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { Provider } from "react-redux"
import {
  useBalanceFetch,
  useConnect,
  useGameDataFetch,
  useGameLoadDataFetch,
  usePopulationFetch,
  useWallet,
  useWalletChange,
  useWalletOnboarding,
} from "shared/hooks"
import LiquidityPool from "ui/LiquidityPool"
import {
  selectHasLoadedBalances,
  selectHasLoadedRealmData,
  selectHasLoadedSeasonInfo,
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
import FullPageLoader from "shared/components/FullPageLoader"
import MobileScreen from "ui/MobileScreen"
// Unfortunately the PostHog React package structure does not play nice with
// no-extraneous-dependencies.
// eslint-disable-next-line import/no-extraneous-dependencies
import { PostHogProvider, usePostHog } from "posthog-js/react"
import reduxStore from "./redux-state"
import * as ServiceWorker from "./shared/service-worker"

function TrackEvents({ children }: { children: ReactNode[] }) {
  const location = useLocation()
  const posthog = usePostHog()

  useEffect(() => {
    posthog?.capture("$pageview", { url: location.pathname })
  }, [])

  return children
}

function DApp() {
  const islandMode = useDappSelector(selectIslandMode)
  const { isConnected } = useConnect()
  const { walletOnboarded } = useWalletOnboarding()

  const hasLoadedRealmData = useDappSelector(selectHasLoadedRealmData)
  const hasLoadedSeasonInfo = useDappSelector(selectHasLoadedSeasonInfo)
  const hasBalances = useDappSelector(selectHasLoadedBalances)

  useWallet()
  useGameLoadDataFetch()
  useBalanceFetch()
  usePopulationFetch()
  useGameDataFetch()
  useWalletChange()

  return (
    <>
      <GlobalStyles />
      <MobileScreen />
      <Router>
        {(!walletOnboarded || !isConnected) && <Onboarding />}
        {walletOnboarded && isConnected && (
          <TrackEvents>
            <FullPageLoader
              loaded={hasLoadedRealmData && hasLoadedSeasonInfo && hasBalances}
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
          </TrackEvents>
        )}
      </Router>
    </>
  )
}

function DAppProviders() {
  return (
    <Provider store={reduxStore}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <PostHogProvider
          apiKey={process.env.POSTHOG_API_KEY}
          options={{
            persistence: "localStorage",
            autocapture: false,
            capture_pageview: false,
            disable_session_recording: true,
            sanitize_properties(properties) {
              return {
                ...properties,
                // The extension has set an expectation that the lib is set to
                // the analytics env.
                $lib: process.env.ANALYTICS_ENV,
              }
            },
          }}
        >
          <DApp />
        </PostHogProvider>
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

  ServiceWorker.register()
}
