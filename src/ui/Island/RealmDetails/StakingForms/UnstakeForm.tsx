import React, { useEffect, useState } from "react"
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
} from "redux-state"
import { isValidInputAmount, userAmountToBigInt } from "shared/utils"
import classNames from "classnames"
import UnstakeCooldown from "shared/components/Staking/UnstakeCooldown"
import { TransactionProgressStatus } from "shared/types"
import TransactionProgress from "shared/components/Transactions/TransactionProgress"
import ModalLeavingRealm from "ui/Island/Modals/ModalLeavingRealm"

const UNSTAKE_TX_ID = "unstake"

export default function UnstakeForm({
  isDisabled,
  balance,
}: {
  isDisabled: boolean
  balance: bigint
}) {
  const dispatch = useDappDispatch()

  const displayedRealmAddress = useDappSelector(selectDisplayedRealmAddress)
  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const displayedRealmId = useDappSelector(selectDisplayedRealmId)

  const [unstakeAmount, setUnstakeAmount] = useState("")
  const amount = userAmountToBigInt(unstakeAmount)

  const [isUnstakeAmountValid, setIsUnstakeAmountValid] = useState(false)

  const [isLeavingRealmModalOpen, setIsLeavingRealmModalOpen] = useState(false)

  const unstakeTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, UNSTAKE_TX_ID)
  )

  const [isUnstakeTransactionModalOpen, setIsUnstakeTransactionModalOpen] =
    useState(false)

  const unstakeTransaction = () => {
    if (displayedRealmAddress && displayedRealmVeTokenAddress && amount) {
      dispatch(
        unstakeTaho({
          id: UNSTAKE_TX_ID,
          realmContractAddress: displayedRealmVeTokenAddress,
          veTokenContractAddress: displayedRealmVeTokenAddress,
          amount,
        })
      )
    }
  }

  const isCooldownPeriod = false

  const unstakeTransactionData = {
    id: UNSTAKE_TX_ID,
    title: "Approve and unstake $TAHO",
    buttonLabel: "Approve & unstake",
    status: unstakeTransactionStatus,
    onClick: unstakeTransaction,
  }

  useEffect(() => {
    if (unstakeTransactionStatus === TransactionProgressStatus.Done) {
      setIsUnstakeTransactionModalOpen(false)
      setUnstakeAmount("")
      dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    }
  }, [dispatch, unstakeTransactionStatus])

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
    if (amount === balance) {
      setIsLeavingRealmModalOpen(true)
    } else {
      setIsUnstakeTransactionModalOpen(true)
    }
  }

  return (
    <>
      {!isCooldownPeriod ? (
        <div
          className={classNames("stake_control", {
            disabled: isDisabled,
          })}
        >
          <div className="stake_control_header">
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
            status={unstakeTransactionData.status}
            disabled={
              isDisabled ||
              !isUnstakeAmountValid ||
              !isValidInputAmount(unstakeAmount)
            }
            onClick={onClickUnstake}
          />
        </div>
      ) : (
        <UnstakeCooldown stakedAt={Date.now()} /> // TODO: change stakedAt to real value
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
