import React from "react"
import { useDappDispatch, updateWalletOnboarding } from "redux-state"
import OnboardingModal from "shared/components/Modals/OnboardingModal"

export default function EnterPortal() {
  const dispatch = useDappDispatch()

  return (
    <OnboardingModal
      buttonLabel="Enter the portal"
      onClick={() => dispatch(updateWalletOnboarding(true))}
    >
      You have been
      <br /> granted passage.
    </OnboardingModal>
  )
}
