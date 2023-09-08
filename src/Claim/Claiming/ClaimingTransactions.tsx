import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { StakingData, claim, stake } from "shared/contracts"

import { useSendTransaction } from "shared/hooks"
import { useSelector, selectEligibility, selectStakingData } from "redux-state"
import { Eligibility, TransactionProgressStatus } from "shared/types"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"

export default function ClaimingTransactions() {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const eligibility = useSelector(selectEligibility)
  const { stakeAmount, regionAddress } = useSelector(selectStakingData)
  const {
    send: sendClaim,
    isReady: isClaimReady,
    status: statusClaim,
  } = useSendTransaction<Eligibility>(claim)

  const {
    send: sendStake,
    isReady: isStakeReady,
    status: statusStake,
  } = useSendTransaction<StakingData>(stake)

  const signClaim = useCallback(async () => {
    if (eligibility && isClaimReady) {
      await sendClaim(eligibility)
    }
  }, [eligibility, sendClaim, isClaimReady])

  const signStake = useCallback(async () => {
    if (
      statusClaim === TransactionProgressStatus.Done &&
      isStakeReady &&
      stakeAmount &&
      regionAddress
    ) {
      await sendStake({
        amount: stakeAmount,
        regionContractAddress: regionAddress,
      })
    }
  }, [statusClaim, sendStake, isStakeReady, stakeAmount, regionAddress])

  useEffect(() => {
    if (statusClaim === TransactionProgressStatus.Done) {
      setShouldRedirect(true)
    }
  }, [statusClaim])

  if (shouldRedirect) {
    return <Redirect to="/claim/finish" />
  }

  return (
    <TransactionsModal
      transactions={[
        {
          id: "claim",
          title: "1. Claim your $TAHO",
          buttonLabel: "Claim",
          status: statusClaim,
          sendTransaction: signClaim,
        },
        {
          id: "stake",
          title: "2. Approve & stake $TAHO",
          buttonLabel: "Stake",
          disabled: statusClaim !== TransactionProgressStatus.Done,
          status: statusStake,
          sendTransaction: signStake,
        },
        // {
        //   id: "representative",
        //   title: "3. Select representative",
        //   buttonLabel: "Vote",
        // },
      ]}
    />
  )
}
