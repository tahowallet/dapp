import React, { useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import Button from "shared/components/Button"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { TransactionProgressStatus } from "shared/types"
import {
  stakeTaho,
  useDappDispatch,
  useDappSelector,
  selectDisplayedRegionAddress,
  selectTokenBalanceByAddress,
  selectStakingRegionAddress,
  selectIsStakingRegionDisplayed,
  selectDisplayedRegionVeTokenAddress,
  unstakeTaho,
} from "redux-state"
import { userAmountToBigInt } from "shared/utils"
import classNames from "classnames"
import { TAHO_ADDRESS } from "shared/constants"
import BannerEarn from "./RegionBanners/BannerEarn"
import BannerTakeToNode from "./RegionBanners/BannerTakeToNode"

function isFormDisabled(
  balance: bigint,
  hasStakingRegion: boolean,
  isStakingRegion: boolean
) {
  return balance === 0n || (hasStakingRegion && !isStakingRegion)
}

type StakingProps = {
  close: () => void
}

export default function Staking({ close }: StakingProps) {
  const dispatch = useDappDispatch()

  const displayedRegionAddress = useDappSelector(selectDisplayedRegionAddress)
  const displayedRegionVeTokenAddress = useDappSelector(
    selectDisplayedRegionVeTokenAddress
  )
  const stakingRegionContractAddress = useDappSelector(
    selectStakingRegionAddress
  )
  const isStakingRegion = useDappSelector(selectIsStakingRegionDisplayed)
  const hasStakingRegion = !!stakingRegionContractAddress

  const tahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, TAHO_ADDRESS)
  )
  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRegionVeTokenAddress)
  )
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStakeAmountValid, setIsStakeAmountValid] = useState(false)

  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isUnstakeAmountValid, setIsUnstakeAmountValid] = useState(false)

  const [isStakeTransactionModalOpen, setIsStakeTransactionModalOpen] =
    useState(false)
  const [isUnstakeTransactionModalOpen, setIsUnstakeTransactionModalOpen] =
    useState(false)

  const disabledStake = isFormDisabled(
    tahoBalance,
    hasStakingRegion,
    isStakingRegion
  )
  const disabledUnstake = isFormDisabled(
    veTahoBalance,
    hasStakingRegion,
    isStakingRegion
  )

  const stakeTransaction = () => {
    const amount = userAmountToBigInt(stakeAmount)
    if (displayedRegionAddress && amount) {
      dispatch(
        stakeTaho({
          regionContractAddress: displayedRegionAddress,
          amount,
        })
      )
    }
  }

  const unstakeTransaction = () => {
    const amount = userAmountToBigInt(unstakeAmount)
    if (displayedRegionAddress && displayedRegionVeTokenAddress && amount) {
      dispatch(
        unstakeTaho({
          regionContractAddress: displayedRegionAddress,
          veTokenContractAddress: displayedRegionVeTokenAddress,
          amount,
        })
      )
    }
  }

  const shouldLinkToNode = hasStakingRegion && !isStakingRegion
  const shouldLinkToReferrals = !shouldLinkToNode && tahoBalance === 0n

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
              disabledStake || !isStakeAmountValid || !Number(stakeAmount)
            }
            onClick={() => setIsStakeTransactionModalOpen(true)}
          >
            Stake $TAHO
          </Button>
        </div>
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
              tokenAddress={displayedRegionVeTokenAddress ?? ""}
              onChange={setUnstakeAmount}
              onValidate={(isValid) => setIsUnstakeAmountValid(isValid)}
            />
          </div>
          <Button
            type="primary"
            size="medium"
            isDisabled={
              disabledUnstake || !isUnstakeAmountValid || !Number(unstakeAmount)
            }
            onClick={() => setIsUnstakeTransactionModalOpen(true)}
          >
            Unstake $TAHO
          </Button>
        </div>
      </div>
      <TransactionsModal
        isOpen={isStakeTransactionModalOpen}
        close={() => setIsStakeTransactionModalOpen(false)}
        transactions={[
          {
            id: "stake",
            title: "Approve and stake $TAHO",
            buttonLabel: "Approve & stake",
            status: TransactionProgressStatus.Idle, // TODO: status is not yet implemented
            sendTransaction: stakeTransaction,
          },
        ]}
      />
      <TransactionsModal
        isOpen={isUnstakeTransactionModalOpen}
        close={() => setIsUnstakeTransactionModalOpen(false)}
        transactions={[
          {
            id: "stake",
            title: "Approve and unstake $TAHO",
            buttonLabel: "Approve & unstake",
            status: TransactionProgressStatus.Idle, // TODO: status is not yet implemented
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
