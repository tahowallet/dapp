import React, { lazy } from "react"
import { useMobileScreen } from "shared/hooks"
import GlobalStyles from "ui/GlobalStyles"

const MobileDApp = lazy(() => import("./MobileDApp"))
const DesktopDApp = lazy(() => import("./DesktopDApp"))

export default function DApp() {
  const isMobileScreen = useMobileScreen()

  return (
    <>
      <GlobalStyles />
      {isMobileScreen ? <MobileDApp /> : <DesktopDApp />}
    </>
  )
}
