import React from "react"
import { useMobileScreen, useTrackEvents, useUnLoad } from "shared/hooks"
import PrivacyPolicy from "shared/components/Misc/PrivacyPolicy"
import DAppMobile from "./DAppMobile"
import DAppDesktop from "./DAppDesktop"

export default function Dapp() {
  const isMobileScreen = useMobileScreen()
  useTrackEvents()
  useUnLoad()

  return (
    <>
      {isMobileScreen ? <DAppMobile /> : <DAppDesktop />}
      <PrivacyPolicy />
    </>
  )
}
