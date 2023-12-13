import React from "react"

import {
  reflectSingleton,
  useBalanceFetch,
  useConnect,
  useCorrectChain,
  useGameDataFetch,
  useGameLoadDataFetch,
  useInitializeReflect,
  useIslandLoaded,
  usePopulationFetch,
  useReflect,
  useWallet,
  useWalletChange,
  useWalletOnboarding,
} from "shared/hooks"
import { ReflectContext } from "shared/context"
import OnboardingView from "ui/Onboarding"
import FullPageLoader from "shared/components/Loaders/FullPageLoader"
import IslandView from "../Island/View/IslandView"

export default function DAppDesktop() {
  const { isConnected } = useConnect()
  const { walletOnboarded } = useWalletOnboarding()
  const isIslandLoaded = useIslandLoaded()
  const { IS_PORTAL_CLOSED } = process.env

  const isOnboarding =
    IS_PORTAL_CLOSED === "true" ||
    !walletOnboarded ||
    !isConnected ||
    !isIslandLoaded

  useInitializeReflect()
  useReflect()
  useWallet()
  useGameLoadDataFetch()
  useBalanceFetch()
  usePopulationFetch()
  useGameDataFetch()
  useWalletChange()
  useCorrectChain()

  return isOnboarding ? (
    <>
      <FullPageLoader loaded={isIslandLoaded} />
      <OnboardingView />
    </>
  ) : (
    <ReflectContext.Provider value={reflectSingleton}>
      <IslandView />
    </ReflectContext.Provider>
  )
}
