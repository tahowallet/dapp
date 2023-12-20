import React from "react"

import { bigIntToDisplayUserAmount, formatTime } from "shared/utils"
import {
  selectDisplayedRealmVeTokenAddress,
  selectTokenBalanceByAddress,
  useDappSelector,
} from "redux-state"

export default function UnstakeCooldown({
  timeRemaining,
}: {
  timeRemaining: number
}) {
  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRealmVeTokenAddress)
  )
  const veTahoUserAmount = bigIntToDisplayUserAmount(veTahoBalance, 18, 5)

  return (
    <>
      <div className="unstake_cooldown">
        <div className="unstake_cooldown_header">
          <div className="amount">Staked amount: {veTahoUserAmount} TAHO</div>
        </div>
        <div className="unstake_cooldown_period">
          <div className="unstake_cooldown_period_header row_center">
            <div>Cooldown period</div>
            <div className="unstake_cooldown_period_time row">
              <p style={{ color: "var(--secondary-s1-80)", fontSize: "16px" }}>
                Time remaining:
              </p>
              <div className="unstake_cooldown_period_time_counter">
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
          <p className="unstake_cooldown_period_info">
            You can&apos;t <span>leave / unstake</span> for the first 1 hour
            since your last stake to the realm
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .unstake_cooldown {
            gap: 14px;
            border-radius: 8px;
          }

          .unstake_cooldown_header {
            padding: 16px 0 9px;
          }

          .unstake_cooldown_period {
            margin: 0 -32px;
            padding: 16px 32px;
            background: var(--primary-p1-100);
            border-radius: 8px;
            flex: 1;
            height: calc(100% - 81px);
          }

          .unstake_cooldown_period_header {
            color: var(--secondary-s1-100);
            font-size: 22px;
            font-weight: 600;
            line-height: 32px;
            margin-bottom: 11px;
            justify-content: space-between;
          }

          .unstake_cooldown_period_info {
            font-size: 18px;
            color: var(--secondary-s1-80);
            margin-bottom: 16px;
          }

          .unstake_cooldown_period_info span {
            font-size: 18px;
            color: var(--secondary-s1-100);
          }

          .unstake_cooldown_period_time {
            gap: 5px;
            align-items: baseline;
          }

          .unstake_cooldown_period_time_counter {
            font-size: 22px;
            font-weight: 600;
            line-height: 32px;
            color: var(--trading-in);
            margin-right: 8px;
          }

          .amount {
            color: var(--secondary-s1-70);
            font-size: 16px;
            line-height: 24px;
            user-select: none;
            pointer-events: none;
          }
        `}
      </style>
    </>
  )
}
