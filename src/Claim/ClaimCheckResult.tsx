import React, { useEffect } from "react"
import {
  fetchEligibility,
  selectEligibility,
  selectHasClaimed,
  useSelector,
  useDispatch,
  fetchHasClaimed,
} from "redux-state"
import { useArbitrumProvider } from "shared/hooks"
import ClaimAlreadyClaimed from "./ClaimAlreadyClaimed"
import ClaimCheckFail from "./ClaimCheckFail"
import ClaimCheckSuccess from "./ClaimCheckSuccess"

export default function ClaimCheckResult() {
  const dispatch = useDispatch()
  const provider = useArbitrumProvider()
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

  if (eligibility.amount > 0) {
    return <ClaimCheckSuccess />
  }

  return <ClaimCheckFail />
}
