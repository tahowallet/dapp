import React from "react"
// import ClaimProgressBar from "./ClaimProgressBar" // not used at the moment
import Version from "shared/components/Misc/Version"
import RealmsBar from "./RealmBar"
import FooterLinks from "./FooterLinks"
import FooterWrapper from "./FooterWrapper"

export default function Footer() {
  return (
    <FooterWrapper
      style={{
        background:
          "linear-gradient(0deg, #032c2a 0%, rgba(0, 29, 27, 0) 100%)",
      }}
    >
      <FooterLinks />
      <Version />
      <RealmsBar />
    </FooterWrapper>
  )
}
