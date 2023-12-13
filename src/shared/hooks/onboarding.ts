/* eslint-disable import/prefer-default-export */
import {
  useDappSelector,
  selectHasLoadedBalances,
  selectHasRelevantTokens,
} from "redux-state"
import { useConnect, useWalletOnboarding } from "./wallets"

export function useOnboardingView() {
  const { walletOnboarded } = useWalletOnboarding()
  const { isConnected } = useConnect()
  const hasBalances = useDappSelector(selectHasLoadedBalances)
  const hasRelevantTokens = useDappSelector(selectHasRelevantTokens)

  return {
    shouldShowOnboardingView:
      (process.env.IS_PORTAL_CLOSED === "true" ||
        process.env.IS_COMING_SOON === "true" ||
        !isConnected ||
        !hasBalances ||
        hasRelevantTokens) &&
      !walletOnboarded,
  }
}
