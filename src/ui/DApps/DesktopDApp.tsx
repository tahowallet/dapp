import React from "react"

import {
  ReflectContext,
  reflectSingleton,
  useBalanceFetch,
  useConnect,
  useCorrectChain,
  useGameDataFetch,
  useGameLoadDataFetch,
  useInitializeReflect,
  usePopulationFetch,
  useReflect,
  useWallet,
  useWalletChange,
  useWalletOnboarding,
} from "shared/hooks"
import Onboarding from "ui/Onboarding"
import PrivacyPolicy from "../../shared/components/Misc/PrivacyPolicy"
import IslandView from "./IslandView"

function DesktopDAppContent() {
  useInitializeReflect()
  useReflect()

  const { isConnected } = useConnect()
  const { walletOnboarded } = useWalletOnboarding()

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
      {process.env.IS_PORTAL_CLOSED !== "true" &&
        walletOnboarded &&
        isConnected && <IslandView />}
      <PrivacyPolicy />
    </>
  )
}

export default function DesktopDApp() {
  return (
    <ReflectContext.Provider value={reflectSingleton}>
      <DesktopDAppContent />
    </ReflectContext.Provider>
  )
}
