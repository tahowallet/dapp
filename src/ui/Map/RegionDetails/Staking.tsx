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
} from "redux-state"
import { userAmountToBigInt, isSameAddress } from "shared/utils"
import classNames from "classnames"
import { TAHO_ADDRESS } from "shared/constants"
import BannerEarn from "./RegionBanners/BannerEarn"
import BannerTakeToNode from "./RegionBanners/BannerTakeToNode"

// TODO change to the correct address
const VE_TOKEN_ADDRESS = CONTRACT_Taho

function isDisabledStake(
  tahoBalance: bigint,
  hasStakingRegion: boolean,
  isStakingRegion: boolean
) {
  return tahoBalance === 0n || (hasStakingRegion && !isStakingRegion)
}

function isDisabledUnstake(
  stakeAmount: bigint | null,
  stakingAddress: string | null,
  selectedRegionAddress: string | null
) {
  // TODO: refactor once we have staked amount
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
  const isStakingRegion = useDappSelector(selectIsStakingRegionDisplayed)
  const hasStakingRegion = !!stakingRegionContractAddress

  const tahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, TAHO_ADDRESS)
  )
  const alreadyStakeAmount = 0n // TODO: find out how much veTaho user has in this region

  const [stakeAmount, setStakeAmount] = useState("")
  const [isStakeAmountValid, setIsStakeAmountValid] = useState(false)

  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isUnstakeAmountValid, setIsUnstakeAmountValid] = useState(false)

  const [isStakeTransactionModalOpen, setIsStakeTransactionModalOpen] =
    useState(false)

  const disabledStake = isDisabledStake(
    tahoBalance,
    hasStakingRegion,
    isStakingRegion
  )
  const disabledUnstake = isDisabledUnstake(
    alreadyStakeAmount,
    stakingRegionContractAddress,
    displayedRegionAddress
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
              tokenAddress={VE_TOKEN_ADDRESS}
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
