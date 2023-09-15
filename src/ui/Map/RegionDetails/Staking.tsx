import React, { useEffect, useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import Button from "shared/components/Button"
import classNames from "classnames"
import { getBalance } from "shared/contracts"
import { useSelector } from "react-redux"
import {
  selectDisplayedRegionAddress,
  selectStakingData,
  selectWalletAddress,
} from "redux-state"
import { useArbitrumProvider } from "shared/hooks"
import { isSameAddress } from "shared/utils"

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

export default function Staking() {
  const address = useSelector(selectWalletAddress)
  const { stakeAmount: alreadyStakeAmount, regionContractAddress } =
    useSelector(selectStakingData)

  const selectedRegionAddress = useSelector(selectDisplayedRegionAddress)

  const provider = useArbitrumProvider()

  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [tahoBalance, setTahoBalance] = useState(0n)

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
        <Button type="primary" size="medium" isDisabled>
          Unstake $TAHO
        </Button>
      </div>

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
    </div>
  )
}
