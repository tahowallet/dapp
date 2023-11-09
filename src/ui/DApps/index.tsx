import React from "react"
import { useMobileScreen, useTrackEvents } from "shared/hooks"
import GlobalStyles from "ui/GlobalStyles"
import MobileDApp from "./MobileDApp"
import DesktopDApp from "./DesktopDApp"

export default function DApp() {
  const isMobileScreen = useMobileScreen()
  useTrackEvents()

  return (
    <>
      <GlobalStyles />
      {isMobileScreen ? <MobileDApp /> : <DesktopDApp />}
    </>
  )
}
