import React from "react"
import {
  useDappSelector,
  selectHasLoadedBalances,
  selectHasRelevantTokens,
} from "redux-state"
import { useConnect } from "shared/hooks"
import BetaEndModal from "ui/Island/Modals/BetaEndModal"
import ConnectWallet from "./modals/ConnectWallet"
import EnterPortal from "./modals/EnterPortal"
import JoinWaitlist from "./modals/JoinWaitlist"
import OnboardingModalLoader from "./modals/Loader"

export default function OnboardingContent() {
  const { isConnected } = useConnect()
  const hasBalances = useDappSelector(selectHasLoadedBalances)
  const hasRelevantTokens = useDappSelector(selectHasRelevantTokens)

  if (process.env.IS_PORTAL_CLOSED === "true") {
    return (
      <BetaEndModal header="Portal is closed">
        Thanks for participating in our Beta, we hope you had fun
        <br /> and see you in Season 1.
      </BetaEndModal>
    )
  }

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
    return <OnboardingModalLoader text="Checking list..." />
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
