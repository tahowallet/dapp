import React from "react"
import { useAssets, useConnect } from "shared/hooks"
import {
  useDappSelector,
  selectHasRelevantTokens,
  selectHasLoadedBalances,
} from "redux-state"
import FullPageLoader from "shared/components/Loaders/FullPageLoader"
import Nav from "ui/Nav"
import portalBackground from "shared/assets/portal-background.mp4"
import Version from "shared/components/Misc/Version"
import OnboardingFooter from "ui/Footer/OnboardingFooter"
import BetaEndModal from "ui/Island/Modals/BetaEndModal"
import ConnectWallet from "./ConnectWallet"
import JoinWaitlist from "./JoinWaitlist"
import EnterPortal from "./EnterPortal"
import OnboardingModalLoader from "./Loader"

function OnboardingModal() {
  const { isConnected } = useConnect()
  const hasBalances = useDappSelector(selectHasLoadedBalances)
  const hasRelevantTokens = useDappSelector(selectHasRelevantTokens)

  if (process.env.IS_COMING_SOON === "true") {
    return (
      <JoinWaitlist>
        Portal opens
        <br />
        soon
      </JoinWaitlist>
    )
  }

  if (!isConnected) {
    return <ConnectWallet />
  }

  if (!hasBalances) {
    return <OnboardingModalLoader />
  }

  if (hasRelevantTokens) {
    return <EnterPortal />
  }

  return (
    <JoinWaitlist>
      The Portal
      <br /> is Open
    </JoinWaitlist>
  )
}

export default function Onboarding() {
  const assetsLoaded = useAssets([portalBackground])

  return (
    <>
      <FullPageLoader loaded={assetsLoaded} />
      <div className="onboarding">
        {process.env.IS_PORTAL_CLOSED === "true" ? (
          <BetaEndModal header="Portal is closed">
            Thanks for participating in our Beta, we hope you had fun
            <br /> and see you in Season 1.
          </BetaEndModal>
        ) : (
          <OnboardingModal />
        )}
        <video className="onboarding_video" autoPlay muted loop playsInline>
          <source src={portalBackground} />
        </video>
        <div style={{ position: "absolute", right: 27, bottom: 4 }}>
          <Version />
        </div>
      </div>
      <Nav />
      <OnboardingFooter />
      <style jsx>{`
        .onboarding {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }
        .onboarding_video {
          position: absolute;
          height: 107%;
          width: 100%;
          inset: 0;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
