import React from "react"

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
import PrivacyPolicy from "../../shared/components/PrivacyPolicy"
import IslandView from "./IslandView"

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
    <>
      {!walletOnboarded && <Onboarding />}
      {walletOnboarded && isConnected && <IslandView />}
      <PrivacyPolicy />
    </>
  )
}
