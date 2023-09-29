import React, { useEffect, useState } from "react"
import portalBackground from "shared/assets/portal-background.png"
import { useConnect } from "shared/hooks"
import { useDappSelector, selectTokenBalanceBySymbol } from "redux-state"
import { parseTahoAmount } from "shared/utils"
import FullPageLoader from "shared/components/Loaders/FullPage"
import Nav from "ui/Nav"
import ConnectWallet from "./ConnectWallet"
import JoinWaitlist from "./JoinWaitlist"
import EnterPortal from "./EnterPortal"

export default function Onboarding() {
  const [onboardingLoaded, setOnboardingLoaded] = useState(false)
  const { isConnected } = useConnect()

  const tahoBalance = parseTahoAmount(
    useDappSelector((state) => selectTokenBalanceBySymbol(state, "TAHO"))
  )

  useEffect(() => {
    // TODO: remove this timeout and replace it with function to await assets being loaded
    const timeout = setTimeout(() => setOnboardingLoaded(true), 3000)
    return () => clearTimeout(timeout)
  }, [])

  if (!onboardingLoaded) return <FullPageLoader />

  return (
    <>
      <div className="onboarding">
        {!isConnected && <ConnectWallet />}
        {isConnected && !tahoBalance && <JoinWaitlist />}
        {isConnected && tahoBalance && <EnterPortal />}
      </div>
      <Nav />
      <style jsx>{`
        .onboarding {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: url(${portalBackground});
          background-size: cover;
          background-position-x: 55%;
        }
      `}</style>
    </>
  )
}
