import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import { providers } from "ethers"
import { hasAlreadyClaimed } from "../shared/contracts"
import { Eligibility } from "../shared/types"
import ClaimCheck from "./ClaimCheck"
import Claiming from "./Claiming"
import ClaimFinish from "./ClaimFinish"
import { useWallet } from "../shared/hooks"
import { ClaimState, ClaimContext, DEFAULT_CLAIM_STATE } from "./hooks"
import { getEligibility } from "../shared/utils"
import ClaimAlreadyClaimed from "./ClaimAlreadyClaimed"
import ClaimCheckResult from "./ClaimCheckResult"

export default function Claim() {
  const { path } = useRouteMatch()
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
    const claimingAddress = claimingAccount.userDetails.address

    if (claimingAddress) {
      const eligible = async () => {
        const eligibility = await getEligibility(claimingAddress)

        setClaimingAccount((prevState) => ({
          ...prevState,
          claimDetails: {
            ...prevState.claimDetails,
            isEligible: eligibility.amount > 0,
            eligibility,
          },
        }))
      }
      eligible()
    }
  }, [claimingAccount.userDetails.address])

  useEffect(() => {
    const checkIfAlreadyClaimed = async (
      provider: providers.Provider,
      eligibility: Eligibility
    ) => {
      const hasClaimed = await hasAlreadyClaimed(provider, eligibility)
      setClaimingAccount((prevState) => ({
        ...prevState,
        claimDetails: {
          ...prevState.claimDetails,
          hasClaimed,
        },
      }))
    }

    if (wallet.provider && claimingAccount.claimDetails.eligibility) {
      checkIfAlreadyClaimed(
        wallet.provider,
        claimingAccount.claimDetails.eligibility
      )
    }
  }, [wallet.provider, claimingAccount.claimDetails.eligibility])

  return (
    <ClaimContext.Provider value={claimingAccount}>
      <Switch>
        <Route path={`${path}/result`}>
          <ClaimCheckResult setClaimingAccount={setClaimingAccount} />
        </Route>
        <Route path={`${path}/claiming`}>
          <Claiming />
        </Route>
        <Route path={`${path}/finish`}>
          <ClaimFinish />
        </Route>
        <Route path={`${path}/claimed`}>
          <ClaimAlreadyClaimed />
        </Route>
        <Route exact path={path}>
          <ClaimCheck setClaimingAccount={setClaimingAccount} />
        </Route>
      </Switch>
    </ClaimContext.Provider>
  )
}
