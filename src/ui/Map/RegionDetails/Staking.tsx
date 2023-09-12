import React, { useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import Button from "shared/components/Button"

// TODO change to the correct address
const VE_TOKEN_ADDRESS = CONTRACT_Taho

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")

  return (
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
        <Button type="primary" size="medium" isDisabled>
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
    </div>
  )
}
