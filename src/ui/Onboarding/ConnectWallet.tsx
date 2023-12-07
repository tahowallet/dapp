import React from "react"
import OnboardingModal from "ui/Island/Modals/OnboardingModal"
import { useConnect } from "shared/hooks"

export default function ConnectWallet() {
  const { connect } = useConnect()

  return (
    <OnboardingModal buttonLabel="Connect wallet" onClick={() => connect()}>
      Connect Taho
      <br /> to open the portal.
    </OnboardingModal>
  )
}
