import React from "react"
import OnboardingModal from "shared/components/Modals/OnboardingModal"

export default function EnterPortal() {
  const enterPortalHanler = () => {}

  return (
    <OnboardingModal buttonLabel="Enter the portal" onClick={enterPortalHanler}>
      You have been
      <br /> granted passage.
    </OnboardingModal>
  )
}
