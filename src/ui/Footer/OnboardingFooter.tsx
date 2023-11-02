import React from "react"
import FooterWrapper from "./FooterWrapper"
import FooterLinks from "./FooterLinks"
import PopulationCount from "./PopulationCount"

export default function OnboardingFooter() {
  return (
    <FooterWrapper>
      <FooterLinks />
      <PopulationCount />
    </FooterWrapper>
  )
}
