import React, { useEffect, useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import {
  stakeTaho,
  useDappDispatch,
  useDappSelector,
  selectDisplayedRealmAddress,
  selectTokenBalanceByAddress,
  selectStakingRealmAddress,
  selectIsStakingRealmDisplayed,
  selectDisplayedRealmVeTokenAddress,
  unstakeTaho,
  selectDisplayedRealmId,
  selectTransactionStatusById,
  stopTrackingTransactionStatus,
} from "redux-state"
import { isValidInputAmount, userAmountToBigInt } from "shared/utils"
import classNames from "classnames"
import { TAHO_ADDRESS } from "shared/constants"
import UnstakeCooldown from "shared/components/Staking/UnstakeCooldown"
import { TransactionProgressStatus } from "shared/types"
import TransactionProgress from "shared/components/Transactions/TransactionProgress"
import ModalLeavingRealm from "../Modals/ModalLeavingRealm"
import BannerEarn from "./RealmBanners/BannerEarn"
import BannerTakeToRealm from "./RealmBanners/BannerTakeToRealm"

function isFormDisabled(
  balance: bigint,
  hasStakingRealm: boolean,
  isStakingRealm: boolean
) {
  return balance === 0n || (hasStakingRealm && !isStakingRealm)
}

type StakingProps = {
  close: () => void
}

const STAKE_TX_ID = "stake"
const UNSTAKE_TX_ID = "unstake"

export default function Staking({ close }: StakingProps) {
  const dispatch = useDappDispatch()

  const displayedRealmAddress = useDappSelector(selectDisplayedRealmAddress)
  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const stakingRealmContractAddress = useDappSelector(selectStakingRealmAddress)
  const displayedRealmId = useDappSelector(selectDisplayedRealmId)
  const isStakingRealm = useDappSelector(selectIsStakingRealmDisplayed)
  const hasStakingRealm = !!stakingRealmContractAddress

  const tahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, TAHO_ADDRESS)
  )
  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRealmVeTokenAddress)
  )
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStakeAmountValid, setIsStakeAmountValid] = useState(false)

  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isUnstakeAmountValid, setIsUnstakeAmountValid] = useState(false)

  const [isLeavingRealmVisible, setIsLeavingRealmVisible] = useState(false)

  const stakeTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, STAKE_TX_ID)
  )

  const unstakeTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, UNSTAKE_TX_ID)
  )

  const [isStakeTransactionModalOpen, setIsStakeTransactionModalOpen] =
    useState(false)
  const [isUnstakeTransactionModalOpen, setIsUnstakeTransactionModalOpen] =
    useState(false)

  const disabledStake = isFormDisabled(
    tahoBalance,
    hasStakingRealm,
    isStakingRealm
  )
  const disabledUnstake = isFormDisabled(
    veTahoBalance,
    hasStakingRealm,
    isStakingRealm
  )

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
    }
  }

  const unstakeTransaction = () => {
    const amount = userAmountToBigInt(unstakeAmount)
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
  }

  const shouldLinkToRealm = hasStakingRealm && !isStakingRealm
  const shouldLinkToReferrals = !shouldLinkToRealm && tahoBalance === 0n

  const isCooldownPeriod = false

  const stakeTransactionData = {
    id: STAKE_TX_ID,
    title: "Approve and stake $TAHO",
    buttonLabel: "Approve & stake",
    status: stakeTransactionStatus,
    onClick: stakeTransaction,
  }

  const unstakeTransactionData = {
    id: UNSTAKE_TX_ID,
    title: "Approve and unstake $TAHO",
    buttonLabel: "Approve & unstake",
    status: unstakeTransactionStatus,
    onClick: unstakeTransaction,
  }

  useEffect(() => {
    if (stakeTransactionStatus === TransactionProgressStatus.Done) {
      setIsStakeTransactionModalOpen(false)
      setStakeAmount("")
      dispatch(stopTrackingTransactionStatus(STAKE_TX_ID))
    }
  }, [dispatch, stakeTransactionStatus])

  useEffect(() => {
    if (unstakeTransactionStatus === TransactionProgressStatus.Done) {
      setIsUnstakeTransactionModalOpen(false)
      setUnstakeAmount("")
      dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    }
  }, [dispatch, unstakeTransactionStatus])

  useEffect(
    () => () => {
      dispatch(stopTrackingTransactionStatus(STAKE_TX_ID))
      dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
    },
    [dispatch]
  )

  return (
    <>
      {shouldLinkToRealm && <BannerTakeToRealm />}
      {shouldLinkToReferrals && <BannerEarn close={close} />}

      <div className="staking">
        <div
          className={classNames("stake_control", {
            disabled: disabledStake,
          })}
        >
          <div className="stake_control_header">
            <h3 style={{ color: "var(--trading-in)" }}>Stake</h3>
            <TokenAmountInput
              label="Wallet balance:"
              inputLabel="Stake amount"
              disabled={disabledStake}
              amount={stakeAmount}
              tokenAddress={CONTRACT_Taho}
              onChange={setStakeAmount}
              onValidate={(isValid) => setIsStakeAmountValid(isValid)}
            />
          </div>
          <TransactionProgress
            buttonLabel="Stake $TAHO"
            buttonSize="medium"
            status={stakeTransactionData.status}
            disabled={
              disabledStake ||
              !isStakeAmountValid ||
              !isValidInputAmount(stakeAmount)
            }
            onClick={() => setIsStakeTransactionModalOpen(true)}
          />
        </div>
        {!isCooldownPeriod ? (
          <div
            className={classNames("stake_control", {
              disabled: disabledUnstake,
            })}
          >
            <div className="stake_control_header">
              <h3 style={{ color: "var(--trading-out)" }}>Unstake</h3>
              <TokenAmountInput
                label="Staked amount:"
                inputLabel="Unstake amount"
                disabled={disabledUnstake}
                amount={unstakeAmount}
                tokenAddress={displayedRealmVeTokenAddress ?? ""}
                onChange={setUnstakeAmount}
                onValidate={(isValid) => setIsUnstakeAmountValid(isValid)}
              />
            </div>
            <TransactionProgress
              buttonLabel="Unstake $TAHO"
              buttonSize="medium"
              status={unstakeTransactionData.status}
              disabled={
                disabledUnstake ||
                !isUnstakeAmountValid ||
                !isValidInputAmount(unstakeAmount)
              }
              onClick={() => setIsUnstakeTransactionModalOpen(true)}
            />
          </div>
        ) : (
          <UnstakeCooldown stakedAt={Date.now()} /> // TODO: change stakedAt to real value
        )}
      </div>
      {isLeavingRealmVisible && displayedRealmId && (
        <ModalLeavingRealm
          realmId={displayedRealmId}
          close={() => setIsLeavingRealmVisible(false)}
        />
      )}
      <TransactionsModal
        isOpen={isStakeTransactionModalOpen}
        close={() => setIsStakeTransactionModalOpen(false)}
        transactions={[stakeTransactionData]}
      />
      <TransactionsModal
        isOpen={isUnstakeTransactionModalOpen}
        close={() => setIsUnstakeTransactionModalOpen(false)}
        transactions={[unstakeTransactionData]}
      />
      <style jsx>{`
        .staking {
          display: flex;
          gap: 32px;
          padding: 24px 0;
        }
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
