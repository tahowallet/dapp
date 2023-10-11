import React from "react"
import GoldenCircleSpinner from "shared/components/Loaders/GoldenCircleSpinner"
import OnboardingModal from "shared/components/Modals/OnboardingModal"

export default function OnboardingModalLoader() {
  return (
    <OnboardingModal>
      <GoldenCircleSpinner />
    </OnboardingModal>
  )
}
