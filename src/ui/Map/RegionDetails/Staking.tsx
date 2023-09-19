import React, { useEffect, useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import Button from "shared/components/Button"
import { isSameAddress } from "shared/utils"
import {
  selectDisplayedRegionAddress,
  selectStakingData,
  selectWalletAddress,
  useDappSelector,
} from "redux-state"
import { useArbitrumProvider } from "shared/hooks"
import { getBalance } from "shared/contracts"
import classNames from "classnames"
import BannerEarn from "./RegionBanners/BannerEarn"
import BannerTakeToNode from "./RegionBanners/BannerTakeToNode"
import ModalLeavingNode from "../Modals/ModalLeavingNode"

// TODO change to the correct address
const VE_TOKEN_ADDRESS = CONTRACT_Taho

// Test data to display valid banner
const VOTING: boolean = false
const STAKED: string | boolean = "disabled"
const HAS_ENOUGH_FUNDS: boolean = true
const HAS_ANOTHER_NODE: boolean = true

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
  const address = useDappSelector(selectWalletAddress)
  // TODO: Ultimately, we shouldn't use claim flow data.
  // This should be change when the staking data will be available in redux
  const { stakeAmount: alreadyStakeAmount, regionContractAddress } =
    useDappSelector(selectStakingData)

  const selectedRegionAddress = useDappSelector(selectDisplayedRegionAddress)

  const provider = useArbitrumProvider()

  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [tahoBalance, setTahoBalance] = useState(0n)

  const [isLeavingModalVisible, setIsLeavingModalVisible] =
    useState<boolean>(false)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider) {
        return
      }

      const newBalance = await getBalance(provider, CONTRACT_Taho, address)
      setTahoBalance(newBalance)
    }

    fetchBalance()
  }, [address, provider])

  const disabledStake = isDisabledStake(
    tahoBalance,
    regionContractAddress,
    selectedRegionAddress
  )
  const disabledUnstake = isDisabledUnstake(
    alreadyStakeAmount,
    regionContractAddress,
    selectedRegionAddress
  )

  return (
    <>
      {HAS_ANOTHER_NODE && !VOTING && STAKED === "disabled" && (
        <BannerTakeToNode />
      )}
      {!HAS_ENOUGH_FUNDS && STAKED === "disabled" && (
        <BannerEarn close={close} />
      )}
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
          <Button type="primary" size="medium" isDisabled>
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
          <Button
            type="primary"
            size="medium"
            onClick={() => setIsLeavingModalVisible(true)}
            isDisabled
          >
            Unstake $TAHO
          </Button>
        </div>
      </div>
      {isLeavingModalVisible && (
        <ModalLeavingNode close={() => setIsLeavingModalVisible(false)} />
      )}
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
