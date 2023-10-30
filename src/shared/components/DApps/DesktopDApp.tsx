import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router } from "react-router-dom"
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

const Onboarding = lazy(() => import("ui/Onboarding"))
const IslandView = lazy(() => import("./IslandView"))

export default function DesktopDApp() {
  const { isConnected } = useConnect()
  const { walletOnboarded } = useWalletOnboarding()

  useWallet()
  useGameLoadDataFetch()
  useBalanceFetch()
  usePopulationFetch()
  useGameDataFetch()
  useWalletChange()

  return (
    <Suspense>
      <Router>
        {(!walletOnboarded || !isConnected) && <Onboarding />}
        {walletOnboarded && isConnected && <IslandView />}
      </Router>
    </Suspense>
  )
}
