import React from "react"
import portalBackground from "shared/assets/portal-background.png"
import { useConnect } from "shared/hooks"
import { useDappSelector, selectTokenBalanceBySymbol } from "redux-state"
import { parseTahoAmount } from "shared/utils"
import ConnectWallet from "./ConnectWallet"
import JoinWaitlist from "./JoinWaitlist"
import EnterPortal from "./EnterPortal"

export default function Onboarding() {
  const { isConnected } = useConnect()
  const tahoBalance = parseTahoAmount(
    useDappSelector((state) => selectTokenBalanceBySymbol(state, "TAHO"))
  )

  return (
    <>
      <div className="onboarding">
        {!isConnected && <ConnectWallet />}
        {isConnected && !tahoBalance && <JoinWaitlist />}
        {isConnected && tahoBalance && <EnterPortal />}
      </div>
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
