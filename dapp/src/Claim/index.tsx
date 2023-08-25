import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import ClaimCheckSuccess from "./ClaimCheckSuccess"
import ClaimCheck from "./ClaimCheck"
import ClaimCheckFail from "./ClaimCheckFail"
import Claiming from "./Claiming"
import ClaimFinish from "./ClaimFinish"
import { useConnect, useWallet } from "../shared/hooks"
import { ClaimState, ClaimContext, DEFAULT_CLAIM_STATE } from "./hooks"
import { getEligibility } from "../shared/utils"

export default function Claim() {
  const { path } = useRouteMatch()
  const { disconnect } = useConnect()
  const wallet = useWallet()
  const [claimingAccount, setClaimingAccount] = useState<ClaimState>({
    ...DEFAULT_CLAIM_STATE,
    userDetails: {
      isConnected: wallet.isConnected,
      name: wallet.name || wallet.truncatedAddress,
      address: wallet.address,
    },
  })

  useEffect(() => {
    setClaimingAccount((prevState) => ({
      ...prevState,
      userDetails: {
        isConnected: wallet.isConnected,
        name: wallet.name || wallet.truncatedAddress,
        address: wallet.address,
      },
    }))
  }, [wallet])

  useEffect(() => {
    if (claimingAccount.userDetails.address) {
      const eligible = async () => {
        const { amount, proof, index } = await getEligibility(
          claimingAccount.userDetails.address
        )

        setClaimingAccount((prevState) => ({
          ...prevState,
          claimDetails: {
            isEligible: amount > 0,
            amount: Number(amount),
            rawAmount: amount,
            proof,
            index,
          },
        }))
      }
      eligible()
    }
  }, [claimingAccount.userDetails.address])

  const resetClaimingAccount = () => {
    // disconnecting wallet because if it was connected then current
    // account wasn't eligible anyway and keeping it connected would
    // just confuse the user why they need to connect again to claim
    disconnect()
    setClaimingAccount(DEFAULT_CLAIM_STATE)
  }

  return (
    <ClaimContext.Provider value={claimingAccount}>
      <Switch>
        <Route path={`${path}/result`}>
          {claimingAccount.claimDetails.isEligible ? (
            <ClaimCheckSuccess />
          ) : (
            <ClaimCheckFail resetClaiming={resetClaimingAccount} />
          )}
        </Route>
        <Route path={`${path}/claiming`}>
          <Claiming />
        </Route>
        <Route path={`${path}/finish`}>
          <ClaimFinish />
        </Route>
        <Route exact path={path}>
          <ClaimCheck setClaimingAccount={setClaimingAccount} />
        </Route>
      </Switch>
    </ClaimContext.Provider>
  )
}
