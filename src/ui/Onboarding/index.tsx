import React from "react"
import { useAssets, useConnect } from "shared/hooks"
import { useDappSelector, selectTokenBalanceBySymbol } from "redux-state"
import { parseTahoAmount } from "shared/utils"
import FullPageLoader from "shared/components/FullPageLoader"
import Nav from "ui/Nav"
import { TAHO_SYMBOL } from "shared/constants"
import portalBackground from "shared/assets/portal-background.mp4"
import ConnectWallet from "./ConnectWallet"
import JoinWaitlist from "./JoinWaitlist"
import EnterPortal from "./EnterPortal"
import OnboardingModalLoader from "./Loader"

export default function Onboarding({
  balanceFetched,
}: {
  balanceFetched: boolean
}) {
  const { isConnected } = useConnect()
  const assetsLoaded = useAssets([portalBackground])

  const tahoBalance = parseTahoAmount(
    useDappSelector((state) => selectTokenBalanceBySymbol(state, TAHO_SYMBOL))
  )

  return (
    <>
      <FullPageLoader loaded={assetsLoaded} />
      <div className="onboarding">
        {!isConnected && <ConnectWallet />}
        {isConnected && !balanceFetched && <OnboardingModalLoader />}
        {isConnected &&
          balanceFetched &&
          (tahoBalance <= 0 ? <JoinWaitlist /> : <EnterPortal />)}
        <video className="onboarding_video" autoPlay muted loop playsInline>
          <source src={portalBackground} />
        </video>
      </div>
      <Nav />
      <style jsx>{`
        .onboarding {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }
        .onboarding_video {
          position: absolute;
          height: 100%;
          width: 100%;
          inset: 0;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
