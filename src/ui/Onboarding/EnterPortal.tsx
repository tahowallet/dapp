import React from "react"
import OnboardingModal from "shared/components/Modals/OnboardingModal"
import { useWalletOnboarding } from "shared/hooks"
import { selectWalletAddress, useDappSelector } from "redux-state"

export default function EnterPortal() {
  const walletAddress = useDappSelector(selectWalletAddress)
  const { updateWalletOnboarding } = useWalletOnboarding()

  return (
    <OnboardingModal
      buttonLabel="Enter the portal"
      onClick={() => updateWalletOnboarding(walletAddress)}
    >
      You have been
      <br /> granted passage.
    </OnboardingModal>
  )
}
