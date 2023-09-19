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
} from "redux-state"
import { userAmountToBigInt, isSameAddress } from "shared/utils"
import classNames from "classnames"
import { TAHO_ADDRESS } from "shared/constants"
import BannerEarn from "./RegionBanners/BannerEarn"
import BannerTakeToNode from "./RegionBanners/BannerTakeToNode"

// TODO change to the correct address
const VE_TOKEN_ADDRESS = CONTRACT_Taho

function isDisabledStake(
  balance: bigint,
  stakingAddress: string | null,
  selectedRegionAddress: string | null
) {
  if (balance === 0n) return true

  if (
    stakingAddress &&
    selectedRegionAddress &&
    !isSameAddress(stakingAddress, selectedRegionAddress)
  )
    return true

  return false
}

function isDisabledUnstake(
  stakeAmount: bigint | null,
  stakingAddress: string | null,
  selectedRegionAddress: string | null
) {
  if (
    stakingAddress &&
    selectedRegionAddress &&
    isSameAddress(stakingAddress, selectedRegionAddress)
  ) {
    if (stakeAmount && stakeAmount > 0n) return false

    return true
  }

  return true
}

type StakingProps = {
  close: () => void
}

export default function Staking({ close }: StakingProps) {
  const dispatch = useDappDispatch()

  const displayedRegionAddress = useDappSelector(selectDisplayedRegionAddress)
  const stakingRegionContractAddress = useDappSelector(
    selectStakingRegionAddress
  )

  const tahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, TAHO_ADDRESS)
  )
  const alreadyStakeAmount = 0n // TODO: find out how much veTaho user has in this region
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  const [isStakeTransactionModalOpen, setIsStakeTransactionModalOpen] =
    useState(false)

  const disabledStake = isDisabledStake(
    tahoBalance,
    stakingRegionContractAddress,
    displayedRegionAddress
  )
  const disabledUnstake = isDisabledUnstake(
    alreadyStakeAmount,
    stakingRegionContractAddress,
    displayedRegionAddress
  )

  const stakeTransaction = async () => {
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

  const shouldLinkToStakingNode =
    stakingRegionContractAddress !== null &&
    displayedRegionAddress !== null &&
    isSameAddress(stakingRegionContractAddress, displayedRegionAddress)

  const shouldLinkToReferrals = !shouldLinkToStakingNode && tahoBalance === 0n

  return (
    <>
      {shouldLinkToStakingNode && <BannerTakeToNode />}
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
            />
          </div>
          <Button
            type="primary"
            size="medium"
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
              tokenAddress={VE_TOKEN_ADDRESS}
              onChange={setUnstakeAmount}
            />
          </div>
          <Button type="primary" size="medium" isDisabled>
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
