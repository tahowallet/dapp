import React from "react"
import OnboardingModal from "shared/components/Modals/OnboardingModal"

export default function EnterPortal({ handler }: { handler: () => void }) {
  return (
    <OnboardingModal buttonLabel="Enter the portal" onClick={handler}>
      You have been
      <br /> granted passage.
    </OnboardingModal>
  )
}
