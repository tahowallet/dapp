import React, { ReactNode, useEffect } from "react"
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom"
import {
  selectHasLoadedBalances,
  selectHasLoadedRealmData,
  selectHasLoadedSeasonInfo,
  selectIslandMode,
  useDappSelector,
} from "redux-state"
import FullPageLoader from "shared/components/FullPageLoader"
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
import Onboarding from "ui/Onboarding"
import IslandComponent from "ui/Island"
import TestingPanel from "testing/components/TestingPanel"
import Nav from "ui/Nav"
import { ROUTES } from "shared/constants"
import Claim from "ui/Claim"
import Referrals from "ui/Referrals"
import LiquidityPool from "ui/LiquidityPool"
import Footer from "ui/Footer"
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePostHog } from "posthog-js/react"

function TrackEvents({ children }: { children: ReactNode[] }) {
  const location = useLocation()
  const posthog = usePostHog()

  useEffect(() => {
    posthog?.capture("$pageview", { url: location.pathname })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}

export default function DesktopDApp() {
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
  )
}
