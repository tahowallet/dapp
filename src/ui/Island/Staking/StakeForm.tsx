import React, { useCallback, useEffect, useState } from "react"
import TokenAmountInput from "shared/components/Interface/TokenAmountInput"
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
  selectDisplayedRealmName,
} from "redux-state"
import { isValidInputAmount } from "shared/utils"
import classNames from "classnames"
import { TAHO_ADDRESS } from "shared/constants"
import { TransactionProgressStatus } from "shared/types"
import TransactionProgress from "shared/components/Transactions/TransactionProgress"
import { useAssistant, useTransactionSuccessCallback } from "shared/hooks"
import { usePostHog } from "posthog-js/react"
import StakeCongratulationsModal from "./StakeCongratulationsModal"

const STAKE_TX_ID = "stake"

export default function StakeForm({ isDisabled }: { isDisabled: boolean }) {
  const dispatch = useDappDispatch()

  const displayedRealmAddress = useDappSelector(selectDisplayedRealmAddress)
  const displayedRealmName = useDappSelector(selectDisplayedRealmName)
  const stakingRealmAddress = useDappSelector(selectStakingRealmAddress)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const [stakeAmount, setStakeAmount] = useState<bigint | null>(null)
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
    if (displayedRealmAddress && stakeAmount) {
      dispatch(
        stakeTaho({
          id: STAKE_TX_ID,
          realmContractAddress: displayedRealmAddress,
          amount: stakeAmount,
        })
      )
      posthog?.capture("Realm stake started", {
        realmName: displayedRealmName,
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
      realmName: displayedRealmName,
    })

    setIsStakeTransactionModalOpen(false)
    setStakeAmount(null)
    dispatch(stopTrackingTransactionStatus(STAKE_TX_ID))
    if (!stakingRealmId) {
      updateAssistant({ visible: true, type: "challenges" })
    }
  }, [posthog, displayedRealmName, dispatch, stakingRealmId, updateAssistant])

  const onInputChange = (value: bigint | null) => {
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
            process.env.IS_BETA_CLOSED === "true" ||
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
