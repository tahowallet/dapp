import React from "react"
import { useMobileScreen, useTrackEvents, useUnLoad } from "shared/hooks"
import GlobalStyles from "ui/GlobalStyles"
import MobileDApp from "./MobileDApp"
import DesktopDApp from "./DesktopDApp"

export default function DApp() {
  const isMobileScreen = useMobileScreen()
  useTrackEvents()
  useUnLoad()

  return (
    <>
      <GlobalStyles />
      {isMobileScreen ? <MobileDApp /> : <DesktopDApp />}
    </>
  )
}
