import React, { useEffect, useState } from "react"

const parseTimeLeft = (stakingTime: number): string => {
  const timeLeft = 3600 - Math.ceil((Date.now() - stakingTime) / 1000)

  return new Date(timeLeft * 1000).toISOString().slice(14, 19)
}

export default function UnstakeCooldown({ stakedAt }: { stakedAt: number }) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  useEffect(() => {
    setTimeRemaining(parseTimeLeft(stakedAt))

    const interval = setInterval(
      () => setTimeRemaining(parseTimeLeft(stakedAt)),
      1000
    )

    return () => clearInterval(interval)
  }, [stakedAt])

  return (
    <>
      <div className="unstake_cooldown">
        <div className="unstake_cooldown_header">
          <h3 style={{ color: "var(--trading-out)" }}>Unstake</h3>
          <div className="amount">Staked amount: 5,387 TAHO</div>
        </div>
        <div className="unstake_cooldown_period">
          <div className="unstake_cooldown_period_header">Cooldown period</div>
          <p className="unstake_cooldown_period_info">
            You can&apos;t <span>leave / unstake</span> for the first 1 hour
            since joining a node
          </p>
          <div className="unstake_cooldown_period_time">
            <p style={{ color: "var(--secondary-s1-80)" }}>Time remaining:</p>
            <div className="unstake_cooldown_period_time_counter">
              {timeRemaining}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .unstake_cooldown {
            min-height: 280px;
            gap: 14px;
            border-radius: 8px;
            background: var(--primary-p1-40);
          }

          .unstake_cooldown_header {
            padding: 16px 24px 9px;
          }

          .unstake_cooldown_period {
            width: 320px;
            padding: 16px 24px 24px;
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
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
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
