import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import {
  claim,
  getAllowance,
  getRegionVeTokenAddress,
  setAllowance,
  stake,
  unstake,
} from "shared/contracts"

import { useArbitrumProvider, useSendTransaction } from "shared/hooks"
import {
  useSelector,
  selectEligibility,
  selectStakingData,
  selectWalletAddress,
} from "redux-state"
import {
  Eligibility,
  StakingData,
  TransactionProgressStatus,
} from "shared/types"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { ROUTES } from "shared/constants"

const MOCK_STAKE_AMOUNT = 1n

export default function ClaimingTransactions() {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const provider = useArbitrumProvider()
  const account = useSelector(selectWalletAddress)
  const eligibility = useSelector(selectEligibility)
  const { /* stakeAmount */ regionContractAddress } =
    useSelector(selectStakingData)
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

  const {
    send: sendUnstake,
    isReady: isUnstakeReady,
    status: statusUnstake,
  } = useSendTransaction(unstake)

  const { send: sendSetAllowance, isReady: isSetAllowanceReady } =
    useSendTransaction(setAllowance)

  const signClaim = async () => {
    if (eligibility && isClaimReady) {
      await sendClaim(eligibility)
    }
  }

  const signStake = async () => {
    if (
      isStakeReady &&
      regionContractAddress &&
      provider &&
      isSetAllowanceReady
    ) {
      const allowanceValue = await getAllowance(provider, CONTRACT_Taho, {
        account,
        contractAddress: regionContractAddress,
      })

      if (allowanceValue < MOCK_STAKE_AMOUNT) {
        await sendSetAllowance(
          { account: regionContractAddress, amount: MOCK_STAKE_AMOUNT },
          CONTRACT_Taho
        )
      }

      await sendStake({
        amount: MOCK_STAKE_AMOUNT, // stakeAmount,
        regionContractAddress,
      })
    }
  }

  const signUnstake = async () => {
    if (
      isUnstakeReady &&
      regionContractAddress &&
      provider &&
      isSetAllowanceReady
    ) {
      const veTokenAddress = await getRegionVeTokenAddress(
        provider,
        regionContractAddress
      )
      const allowanceValue = await getAllowance(provider, veTokenAddress, {
        account,
        contractAddress: regionContractAddress,
      })

      if (allowanceValue < MOCK_STAKE_AMOUNT) {
        await sendSetAllowance(
          { account: regionContractAddress, amount: MOCK_STAKE_AMOUNT },
          veTokenAddress
        )
      }

      await sendUnstake({
        amount: MOCK_STAKE_AMOUNT, // stakeAmount,
        regionContractAddress,
      })
    }
  }

  useEffect(() => {
    if (statusClaim === TransactionProgressStatus.Done) {
      setShouldRedirect(true)
    }
  }, [statusClaim])

  if (shouldRedirect) {
    return <Redirect to={ROUTES.CLAIM.FINISH} />
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
          status: statusStake,
          sendTransaction: signStake,
        },
        {
          id: "unstake",
          title: "3. Approve & unstake $TAHO",
          buttonLabel: "Unstake",
          status: statusUnstake,
          sendTransaction: signUnstake,
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
