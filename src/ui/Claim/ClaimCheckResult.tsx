import React, { useEffect } from "react"
import {
  fetchEligibility,
  selectEligibility,
  selectHasClaimed,
  useDappSelector,
  useDappDispatch,
  fetchHasClaimed,
  selectClaimingUser,
} from "redux-state"
import { useArbitrumProvider } from "shared/hooks"
import { Redirect } from "react-router-dom"
import { ROUTES } from "shared/constants"
import ClaimAlreadyClaimed from "./ClaimAlreadyClaimed"
import ClaimCheckFail from "./ClaimCheckFail"
import ClaimCheckSuccess from "./ClaimCheckSuccess"

export default function ClaimCheckResult() {
  const dispatch = useDappDispatch()
  const provider = useArbitrumProvider()
  const { address } = useDappSelector(selectClaimingUser)

  const hasClaimed = useDappSelector(selectHasClaimed)
  const eligibility = useDappSelector(selectEligibility)

  useEffect(() => {
    dispatch(fetchEligibility())
  }, [dispatch])

  useEffect(() => {
    // we need to schedule this after provider is ready
    if (provider) dispatch(fetchHasClaimed())
  }, [dispatch, provider])

  if (hasClaimed) {
    return <ClaimAlreadyClaimed />
  }

  if (address && !eligibility) {
    return <ClaimCheckFail />
  }

  if (address && eligibility && eligibility.amount > 0n) {
    return <ClaimCheckSuccess />
  }

  return <Redirect to={ROUTES.CLAIM.HOME} />
}
