import React, { useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import Button from "shared/components/Button"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { TransactionProgressStatus } from "shared/types"
import {
  selectRegionById,
  stakeTaho,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import { userAmountToBigInt } from "shared/utils"
import BannerTakeToNode from "./RegionBanners/BannerTakeToNode"
import BannerEarn from "./RegionBanners/BannerEarn"

// TODO change to the correct address
const VE_TOKEN_ADDRESS = CONTRACT_Taho

// Test data to display valid banner
const VOTING: boolean = false
const STAKED: string | boolean = "disabled"
const HAS_ENOUGH_FUNDS: boolean = true
const HAS_ANOTHER_NODE: boolean = true

type StakingProps = {
  regionId: string
  close: () => void
}

export default function Staking({ regionId, close }: StakingProps) {
  const dispatch = useDappDispatch()
  const region = useDappSelector((state) => selectRegionById(state, regionId))
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  const [isStakeTransactionModalOpen, setIsStakeTransactionModalOpen] =
    useState(false)

  const stakeTransaction = async () => {
    const amount = userAmountToBigInt(stakeAmount)
    if (region.regionContractAddress && amount) {
      dispatch(
        stakeTaho({
          regionContractAddress: region.regionContractAddress,
          amount,
        })
      )
    }
  }

  return (
    <>
      {HAS_ANOTHER_NODE && !VOTING && STAKED === "disabled" && (
        <BannerTakeToNode regionId={regionId} />
      )}
      {!HAS_ENOUGH_FUNDS && STAKED === "disabled" && (
        <BannerEarn close={close} />
      )}
      <div className="staking">
        <div className="stake_control">
          <div className="stake_control_header">
            <h3 style={{ color: "var(--trading-in)" }}>Stake</h3>
            <TokenAmountInput
              label="Wallet balance:"
              inputLabel="Stake amount"
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
        <div className="stake_control">
          <div className="stake_control_header">
            <h3 style={{ color: "var(--trading-out)" }}>Unstake</h3>
            <TokenAmountInput
              label="Staked amount:"
              inputLabel="Unstake amount"
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
      `}</style>
    </>
  )
}
