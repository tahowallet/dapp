import React from "react"

import {
  useBalanceFetch,
  useConnect,
  useCorrectChain,
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
  useCorrectChain()

  return (
    <>
      {(!walletOnboarded || !isConnected) && <Onboarding />}
      {walletOnboarded && isConnected && <IslandView />}
      <PrivacyPolicy />
    </>
  )
}
