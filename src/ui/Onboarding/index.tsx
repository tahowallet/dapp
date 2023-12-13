import React from "react"
import Nav from "ui/Nav"
import OnboardingFooter from "ui/Onboarding/OnboardingFooter"
import OnboardingContent from "./OnboardingContent"

function OnboardingView() {
  return (
    <>
      <OnboardingContent />
      <Nav />
      <OnboardingFooter />
    </>
  )
}

export default OnboardingView
