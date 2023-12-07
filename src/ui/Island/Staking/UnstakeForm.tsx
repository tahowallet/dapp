import React, { useCallback, useEffect, useState } from "react"
import TokenAmountInput from "shared/components/Interface/TokenAmountInput"
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
  selectDisplayedRealmName,
} from "redux-state"
import { isValidInputAmount } from "shared/utils"
import classNames from "classnames"
import UnstakeCooldown from "ui/Island/Staking/UnstakeCooldown"
import { TransactionProgressStatus } from "shared/types"
import TransactionProgress from "shared/components/Transactions/TransactionProgress"
import ModalLeavingRealm from "ui/Island/Modals/ModalLeavingRealm"
import {
  useAssistant,
  useStakeCooldownPeriod,
  useTransactionSuccessCallback,
} from "shared/hooks"
import { usePostHog } from "posthog-js/react"

const UNSTAKE_TX_ID = "unstake"

export default function UnstakeForm({ isDisabled }: { isDisabled: boolean }) {
  const dispatch = useDappDispatch()

  const displayedRealmAddress = useDappSelector(selectDisplayedRealmAddress)
  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const displayedRealmId = useDappSelector(selectDisplayedRealmId)
  const displayedRealmName = useDappSelector(selectDisplayedRealmName)

  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRealmVeTokenAddress)
  )
  const [unstakeAmount, setUnstakeAmount] = useState<bigint | null>(null)

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
    if (
      displayedRealmAddress &&
      displayedRealmVeTokenAddress &&
      unstakeAmount
    ) {
      dispatch(
        unstakeTaho({
          id: UNSTAKE_TX_ID,
          realmContractAddress: displayedRealmAddress,
          veTokenContractAddress: displayedRealmVeTokenAddress,
          amount: unstakeAmount,
        })
      )
    }
    posthog?.capture("Realm unstake started", {
      realmName: displayedRealmName,
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
      realmName: displayedRealmName,
    })

    setIsUnstakeTransactionModalOpen(false)
    setIsLeavingRealmModalOpen(false)
    setUnstakeAmount(null)
    dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    updateAssistant({ visible: false, type: "default" })
  }, [dispatch, displayedRealmName, posthog, updateAssistant])

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

  const onInputChange = (value: bigint | null) => {
    setUnstakeAmount(value)

    if (unstakeTransactionStatus === TransactionProgressStatus.Failed) {
      dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    }
  }

  const onClickUnstake = () => {
    if (unstakeAmount === veTahoBalance) {
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
          padding: 16px 0 32px;
          flex-direction: column;
          border-radius: 8px;
        }
        .disabled {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}
