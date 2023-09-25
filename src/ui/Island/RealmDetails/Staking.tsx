import React, { useEffect, useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import Button from "shared/components/Button"
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
import ModalLeavingNode from "../Modals/ModalLeavingNode"
import BannerEarn from "./RealmBanners/BannerEarn"
import BannerTakeToNode from "./RealmBanners/BannerTakeToNode"

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

  const [isLeavingModalVisible, setIsLeavingModalVisible] = useState(false)

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

  const closeStakingTransactionModal = () => {
    setIsStakeTransactionModalOpen(false)
    dispatch(stopTrackingTransactionStatus(STAKE_TX_ID))
  }

  const closeUnstakingTransactionModal = () => {
    setIsUnstakeTransactionModalOpen(false)
    dispatch(stopTrackingTransactionStatus(UNSTAKE_TX_ID))
  }

  const shouldLinkToNode = hasStakingRealm && !isStakingRealm
  const shouldLinkToReferrals = !shouldLinkToNode && tahoBalance === 0n

  const isCooldownPeriod = false

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

  return (
    <>
      {shouldLinkToNode && <BannerTakeToNode />}
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
          <Button
            type="primary"
            size="medium"
            isDisabled={
              disabledStake ||
              !isStakeAmountValid ||
              !isValidInputAmount(stakeAmount)
            }
            onClick={() => setIsStakeTransactionModalOpen(true)}
          >
            Stake $TAHO
          </Button>
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
            <Button
              type="primary"
              size="medium"
              isDisabled={
                disabledUnstake ||
                !isUnstakeAmountValid ||
                !isValidInputAmount(unstakeAmount)
              }
              onClick={() => setIsUnstakeTransactionModalOpen(true)}
            >
              Unstake $TAHO
            </Button>
          </div>
        ) : (
          <UnstakeCooldown stakedAt={Date.now()} /> // TODO: change stakedAt to real value
        )}
      </div>
      {isLeavingModalVisible && displayedRealmId && (
        <ModalLeavingNode
          realmId={displayedRealmId}
          close={() => setIsLeavingModalVisible(false)}
        />
      )}
      <TransactionsModal
        isOpen={isStakeTransactionModalOpen}
        close={closeStakingTransactionModal}
        transactions={[
          {
            id: STAKE_TX_ID,
            title: "Approve and stake $TAHO",
            buttonLabel: "Approve & stake",
            status: stakeTransactionStatus,
            sendTransaction: stakeTransaction,
          },
        ]}
      />
      <TransactionsModal
        isOpen={isUnstakeTransactionModalOpen}
        close={closeUnstakingTransactionModal}
        transactions={[
          {
            id: UNSTAKE_TX_ID,
            title: "Approve and unstake $TAHO",
            buttonLabel: "Approve & unstake",
            status: unstakeTransactionStatus,
            sendTransaction: unstakeTransaction,
          },
        ]}
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
