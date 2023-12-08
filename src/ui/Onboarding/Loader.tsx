import React from "react"
import GoldenCircleSpinner from "shared/components/Loaders/GoldenCircleSpinner"
import LoadingText from "shared/components/Loaders/LoadingText"
import OnboardingModal from "ui/Island/Modals/OnboardingModal"

export default function OnboardingModalLoader() {
  return (
    <OnboardingModal>
      <div style={{ marginTop: 60 }}>
        <GoldenCircleSpinner />
        <LoadingText>
          <p>Checking list...</p>
        </LoadingText>
      </div>
    </OnboardingModal>
  )
}
