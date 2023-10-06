import React from "react"
import OnboardingModal from "shared/components/Modals/OnboardingModal"
import { useWalletOnboarding } from "shared/hooks"
import { selectWalletAddress, useDappSelector } from "redux-state"

export default function EnterPortal() {
  const walletAdress = useDappSelector(selectWalletAddress)
  const [_, setIsOnboarded] = useWalletOnboarding()

  return (
    <OnboardingModal
      buttonLabel="Enter the portal"
      onClick={() => setIsOnboarded(walletAdress)}
    >
      You have been
      <br /> granted passage.
    </OnboardingModal>
  )
}
