import React from "react"
// import ClaimProgressBar from "./ClaimProgressBar" // not used at the moment
import Version from "shared/components/Version"
import RealmsBar from "./RealmBar"
import FooterLinks from "./FooterLinks"
import FooterWrapper from "./FooterWrapper"

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterLinks />
      <Version />
      <RealmsBar />
    </FooterWrapper>
  )
}
