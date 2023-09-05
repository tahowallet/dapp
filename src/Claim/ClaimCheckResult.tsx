import React, { useEffect } from "react"
import {
  fetchEligibility,
  selectEligibility,
  selectHasClaimed,
  useSelector,
  useDispatch,
  fetchHasClaimed,
  selectClaimingUser,
} from "redux-state"
import { useArbitrumProvider } from "shared/hooks"
import { Redirect } from "react-router-dom"
import ClaimAlreadyClaimed from "./ClaimAlreadyClaimed"
import ClaimCheckFail from "./ClaimCheckFail"
import ClaimCheckSuccess from "./ClaimCheckSuccess"

export default function ClaimCheckResult() {
  const dispatch = useDispatch()
  const provider = useArbitrumProvider()
  const { address } = useSelector(selectClaimingUser)

  const hasClaimed = useSelector(selectHasClaimed)
  const eligibility = useSelector(selectEligibility)

  useEffect(() => {
    dispatch(fetchEligibility())
  }, [dispatch])

  useEffect(() => {
    const fetch = async () => {
      if (provider) await dispatch(fetchHasClaimed(provider))
    }

    fetch()
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

  return <Redirect to="/claim" />
}
