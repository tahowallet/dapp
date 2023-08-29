import React, { useContext } from "react"
import { ClaimContext } from "./hooks"
import ClaimAlreadyClaimed from "./ClaimAlreadyClaimed"
import ClaimCheckFail from "./ClaimCheckFail"
import ClaimCheckSuccess from "./ClaimCheckSuccess"
import { ClaimProps } from "./types"

export default function ClaimCheckResult({ setClaimingAccount }: ClaimProps) {
  const {
    claimDetails: { hasClaimed, isEligible },
  } = useContext(ClaimContext)

  if (hasClaimed) {
    return <ClaimAlreadyClaimed />
  }

  if (isEligible) {
    return <ClaimCheckSuccess />
  }

  return <ClaimCheckFail setClaimingAccount={setClaimingAccount} />
}
