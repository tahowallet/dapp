import React, { useCallback, useEffect, useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import {
  stakeTaho,
  useDappDispatch,
  useDappSelector,
  selectDisplayedRealmAddress,
  selectTransactionStatusById,
  stopTrackingTransactionStatus,
  selectStakingRealmAddress,
  selectStakingRealmId,
} from "redux-state"
import { isValidInputAmount, userAmountToBigInt } from "shared/utils"
import classNames from "classnames"
import { TAHO_ADDRESS } from "shared/constants"
import { TransactionProgressStatus } from "shared/types"
import TransactionProgress from "shared/components/Transactions/TransactionProgress"
import { useAssistant, useTransactionSuccessCallback } from "shared/hooks"
// Unfortunately the PostHog React package structure does not play nice with
// no-extraneous-dependencies.
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePostHog } from "posthog-js/react"
import StakeCongratulationsModal from "./StakeCongratulationsModal"

const STAKE_TX_ID = "stake"

export default function StakeForm({ isDisabled }: { isDisabled: boolean }) {
  const dispatch = useDappDispatch()

  const displayedRealmAddress = useDappSelector(selectDisplayedRealmAddress)
  const stakingRealmAddress = useDappSelector(selectStakingRealmAddress)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const [stakeAmount, setStakeAmount] = useState("")
  const [isStakeAmountValid, setIsStakeAmountValid] = useState(false)

  const { updateAssistant } = useAssistant()

  const stakeTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, STAKE_TX_ID)
  )

  const [isStakeTransactionModalOpen, setIsStakeTransactionModalOpen] =
    useState(false)

  const [isCongratulationsModalOpen, setCongratulationsModalOpen] =
    useState(false)

  const posthog = usePostHog()

  const stakeTransaction = () => {
    const amount = userAmountToBigInt(stakeAmount)
    if (displayedRealmAddress && amount) {
      dispatch(
        stakeTaho({
          id: STAKE_TX_ID,
          realmContractAddress: displayedRealmAddress,
          amount,
        })
      )
      posthog?.capture("Realm stake started", {
        realmId: displayedRealmAddress,
      })
    }
  }

  const stakeTransactionData = {
    id: STAKE_TX_ID,
    title: "Approve and stake $TAHO",
    buttonLabel: "Approve & stake",
    status: stakeTransactionStatus,
    onClick: stakeTransaction,
  }

  const openCongratulationsModal = () => {
    if (!stakingRealmAddress) {
      setCongratulationsModalOpen(true)
    }
  }

  const stakeTransactionSuccessCallback = useCallback(() => {
    posthog?.capture("Realm stake completed", {
      realmId: displayedRealmAddress,
    })

    setIsStakeTransactionModalOpen(false)
    setStakeAmount("")
    dispatch(stopTrackingTransactionStatus(STAKE_TX_ID))
    if (!stakingRealmId) {
      updateAssistant({ visible: true, type: "quests" })
    }
  }, [
    dispatch,
    posthog,
    displayedRealmAddress,
    stakingRealmId,
    updateAssistant,
  ])

  const onInputChange = (value: string) => {
    setStakeAmount(value)

    if (stakeTransactionStatus === TransactionProgressStatus.Failed) {
      dispatch(stopTrackingTransactionStatus(STAKE_TX_ID))
    }
  }

  useTransactionSuccessCallback(stakeTransactionStatus, () => {
    stakeTransactionSuccessCallback()
    openCongratulationsModal()
  })

  useEffect(
    () => () => {
      dispatch(stopTrackingTransactionStatus(STAKE_TX_ID))
    },
    [dispatch]
  )

  return (
    <>
      <div
        className={classNames("stake_control", {
          disabled: isDisabled,
        })}
      >
        <div>
          <h3 style={{ color: "var(--trading-in)" }}>Stake</h3>
          <TokenAmountInput
            label="Wallet balance:"
            inputLabel="Stake amount"
            disabled={isDisabled}
            amount={stakeAmount}
            tokenAddress={TAHO_ADDRESS}
            onChange={onInputChange}
            onValidate={(isValid) => setIsStakeAmountValid(isValid)}
          />
        </div>
        <TransactionProgress
          buttonLabel="Stake $TAHO"
          buttonSize="medium"
          status={stakeTransactionStatus}
          disabled={
            isDisabled ||
            !isStakeAmountValid ||
            !isValidInputAmount(stakeAmount)
          }
          onClick={() => setIsStakeTransactionModalOpen(true)}
        />
      </div>
      <TransactionsModal
        isOpen={isStakeTransactionModalOpen}
        close={() => setIsStakeTransactionModalOpen(false)}
        transactions={[stakeTransactionData]}
      />
      <StakeCongratulationsModal
        isOpen={isCongratulationsModalOpen}
        close={() => setCongratulationsModalOpen(false)}
      />
      <style jsx>{`
        .stake_control {
          display: flex;
          min-height: 280px;
          padding: 16px 24px 24px 24px;
          flex-direction: column;
          gap: 14px;
          border-radius: 8px;
          background: var(--primary-p1-40);
        }
        .disabled {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}
