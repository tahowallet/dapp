import React, { useEffect, useState } from "react"
import { formatUnits } from "ethers/lib/utils"
import Button from "shared/components/Button"
import SharedInput from "shared/components/Input"
import { useWallet } from "shared/hooks"
import { getBalance } from "shared/contracts/erc20"

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const { provider, address } = useWallet()

  useEffect(() => {
    if (!provider) {
      return
    }

    getBalance(provider, CONTRACT_Taho, address).then((balance) =>
      // FIXME: This is just for testing
      // eslint-disable-next-line no-console
      console.log(formatUnits(balance, 18))
    )
  }, [address, provider])

  return (
    <div className="staking">
      <div className="stake_control">
        <div className="stake_control_header">
          <h3 style={{ color: "var(--trading-in)" }}>Stake</h3>
          <div className="amount_group">
            <div className="label">Wallet balance: 12,000 TAHO</div>
            <SharedInput
              label="Stake amount"
              value={stakeAmount}
              onChange={setStakeAmount}
              validate={(value) => {
                const parsed = parseFloat(value)

                if (parsed > 12000) {
                  return { error: "Insufficient balance" }
                }

                return { value: parsed }
              }}
              rightComponent={
                <Button type="tertiary" size="medium">
                  Max
                </Button>
              }
            />
          </div>
        </div>
        <Button type="primary" size="medium" isDisabled>
          Stake $TAHO
        </Button>
      </div>
      <div className="stake_control">
        <div className="stake_control_header">
          <h3 style={{ color: "var(--trading-out)" }}>Unstake</h3>
          <div className="amount_group">
            <div className="label">Staked amount: 12.428 TAHO</div>
            <SharedInput
              label="Unstake amount"
              value={unstakeAmount}
              onChange={setUnstakeAmount}
              validate={(value) => {
                const parsed = parseFloat(value)

                if (parsed > 12.428) {
                  return { error: "Insufficient balance" }
                }

                return { value: parsed }
              }}
              rightComponent={
                <Button type="tertiary" size="medium">
                  Max
                </Button>
              }
            />
          </div>
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

        .label {
          font: var(--text-label);
          color: var(--secondary-s1-70);
        }
      `}</style>
    </div>
  )
}
