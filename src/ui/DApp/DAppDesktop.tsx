import React from "react"

import OnboardingView from "ui/Onboarding/OnboardingView"
import IslandView from "ui/Island/IslandView"
import {
  useBalanceFetch,
  useCorrectChain,
  useGameDataFetch,
  useGameLoadDataFetch,
  useOnboardingView,
  usePopulationFetch,
  useWallet,
  useWalletChange,
} from "shared/hooks"

export default function DAppDesktop() {
  useWallet()
  useGameLoadDataFetch()
  useBalanceFetch()
  usePopulationFetch()
  useGameDataFetch()
  useWalletChange()
  useCorrectChain()

  const { shouldShowOnboardingView } = useOnboardingView()

  return shouldShowOnboardingView ? <OnboardingView /> : <IslandView />
}
