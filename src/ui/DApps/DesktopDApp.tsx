import React, { ReactNode, useEffect } from "react"
import { BrowserRouter as Router, useLocation } from "react-router-dom"

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

// eslint-disable-next-line import/no-extraneous-dependencies
import { usePostHog } from "posthog-js/react"
import PrivacyPolicy from "../../shared/components/PrivacyPolicy"
import IslandView from "./IslandView"

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
  const { walletOnboarded } = useWalletOnboarding()
  const { isConnected } = useConnect()

  useWallet()
  useGameLoadDataFetch()
  useBalanceFetch()
  usePopulationFetch()
  useGameDataFetch()
  useWalletChange()

  return (
    <Router>
      <TrackEvents>
        {!walletOnboarded && <Onboarding />}
        {walletOnboarded && isConnected && <IslandView />}
        <PrivacyPolicy />
      </TrackEvents>
    </Router>
  )
}
