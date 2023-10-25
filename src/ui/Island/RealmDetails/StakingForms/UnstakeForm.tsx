import React, { useCallback, useEffect, useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import {
  useDappDispatch,
  useDappSelector,
  selectDisplayedRealmAddress,
  selectDisplayedRealmVeTokenAddress,
  unstakeTaho,
  selectDisplayedRealmId,
  selectTransactionStatusById,
  stopTrackingTransactionStatus,
  selectTokenBalanceByAddress,
} from "redux-state"
import { isValidInputAmount, userAmountToBigInt } from "shared/utils"
import classNames from "classnames"
import UnstakeCooldown from "shared/components/Staking/UnstakeCooldown"
import { TransactionProgressStatus } from "shared/types"
import TransactionProgress from "shared/components/Transactions/TransactionProgress"
import ModalLeavingRealm from "ui/Island/Modals/ModalLeavingRealm"
import {
  useAssistant,
  useStakeCooldownPeriod,
  useTransactionSuccessCallback,
} from "shared/hooks"
// Unfortunately the PostHog React package structure does not play nice with
// no-extraneous-dependencies.
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePostHog } from "posthog-js/react"

const UNSTAKE_TX_ID = "unstake"

export default function UnstakeForm({ isDisabled }: { isDisabled: boolean }) {
  const dispatch = useDappDispatch()

  const displayedRealmAddress = useDappSelector(selectDisplayedRealmAddress)
  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const displayedRealmId = useDappSelector(selectDisplayedRealmId)

  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRealmVeTokenAddress)
  )
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const amount = userAmountToBigInt(unstakeAmount)

  const [isUnstakeAmountValid, setIsUnstakeAmountValid] = useState(false)

  const [isLeavingRealmModalOpen, setIsLeavingRealmModalOpen] = useState(false)

  const { updateAssistant } = useAssistant()

  const unstakeTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, UNSTAKE_TX_ID)
  )

  const [isUnstakeTransactionModalOpen, setIsUnstakeTransactionModalOpen] =
    useState(false)

  const { timeRemaining, hasCooldown } = useStakeCooldownPeriod()

  const posthog = usePostHog()

  const unstakeTransaction = () => {
    if (displayedRealmAddress && displayedRealmVeTokenAddress && amount) {
      dispatch(
        unstakeTaho({
          id: UNSTAKE_TX_ID,
          realmContractAddress: displayedRealmAddress,
          veTokenContractAddress: displayedRealmVeTokenAddress,
          amount,
        })
      )
    }
    posthog?.capture("Realm stake started", {
      realmId: displayedRealmAddress,
    })
  }

  const unstakeTransactionData = {
    id: UNSTAKE_TX_ID,
    title: "Approve and unstake $TAHO",
    buttonLabel: "Approve & unstake",
    status: unstakeTransactionStatus,
    onClick: unstakeTransaction,
  }

  const unstakeTransactionSuccessCallback = useCallback(() => {
    posthog?.capture("Realm unstake completed", {
      realmId: displayedRealmAddress,
    })

    setIsUnstakeTransactionModalOpen(false)
    setIsLeavingRealmModalOpen(false)
    setUnstakeAmount("")
    dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    updateAssistant({ visible: false, type: "default" })
  }, [dispatch, displayedRealmAddress, posthog, updateAssistant])

  useTransactionSuccessCallback(
    unstakeTransactionStatus,
    unstakeTransactionSuccessCallback
  )

  useEffect(
    () => () => {
      dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    },
    [dispatch]
  )

  const onInputChange = (value: string) => {
    setUnstakeAmount(value)

    if (unstakeTransactionStatus === TransactionProgressStatus.Failed) {
      dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    }
  }

  const onClickUnstake = () => {
    if (amount === veTahoBalance) {
      setIsLeavingRealmModalOpen(true)
    } else {
      setIsUnstakeTransactionModalOpen(true)
    }
  }

  return (
    <>
      {timeRemaining && hasCooldown && !isDisabled ? (
        <UnstakeCooldown timeRemaining={timeRemaining} />
      ) : (
        <div
          className={classNames("stake_control", {
            disabled: isDisabled,
          })}
        >
          <div>
            <h3 style={{ color: "var(--trading-out)" }}>Unstake</h3>
            <TokenAmountInput
              label="Staked amount:"
              inputLabel="Unstake amount"
              disabled={isDisabled}
              amount={unstakeAmount}
              tokenAddress={displayedRealmVeTokenAddress ?? ""}
              onChange={onInputChange}
              onValidate={(isValid) => setIsUnstakeAmountValid(isValid)}
            />
          </div>
          <TransactionProgress
            buttonLabel="Unstake $TAHO"
            buttonSize="medium"
            status={unstakeTransactionStatus}
            disabled={
              isDisabled ||
              !isUnstakeAmountValid ||
              !isValidInputAmount(unstakeAmount)
            }
            onClick={onClickUnstake}
          />
        </div>
      )}
      {isLeavingRealmModalOpen && displayedRealmId && (
        <ModalLeavingRealm
          realmId={displayedRealmId}
          transaction={unstakeTransactionData}
          close={() => setIsLeavingRealmModalOpen(false)}
        />
      )}
      <TransactionsModal
        isOpen={isUnstakeTransactionModalOpen}
        close={() => setIsUnstakeTransactionModalOpen(false)}
        transactions={[unstakeTransactionData]}
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
