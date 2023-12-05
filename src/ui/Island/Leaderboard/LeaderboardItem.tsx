import React, { useEffect, useState } from "react"
import classNames from "classnames"
import {
  bigIntToDisplayUserAmount,
  resolveAddressToWalletData,
  truncateAddress,
} from "shared/utils"
import { LeaderboardItemData } from "shared/types"

export default function LeaderboardItem({
  item,
  rank,
}: {
  item: LeaderboardItemData
  rank: number
}) {
  const { beneficiary: address, amount } = item

  const [username, setUsername] = useState("")

  useEffect(() => {
    const getName = async () => {
      const data = await resolveAddressToWalletData(address)

      if (!data) return

      if (data.name) setUsername(data.name)
    }
    getName()
  }, [address])

  return (
    <>
      <li key={address}>
        <div className={classNames("leaderboard_item")} data-rank={rank}>
          <span className="rank">{rank}</span>
          <span className="address">
            {username || truncateAddress(address)}
          </span>
          <span className="xp">
            {bigIntToDisplayUserAmount(amount, 18, 0)} XP
          </span>
        </div>
      </li>
      <style jsx>{`
        .leaderboard_item {
          padding: 0 16px 0 0;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--secondary-s1-70);
          font: 500 18px/1.2 var(--sans);
          line-height: 28px;
        }
        .address {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .xp {
          margin-left: auto;
          overflow: visible;
          white-space: nowrap;
        }
        .rank {
          width: 20px;
        }
        .leaderboard_item[data-rank="1"] {
          color: #ffc700;
        }

        .leaderboard_item[data-rank="2"] {
          color: #d0d6d6;
        }

        .leaderboard_item[data-rank="3"] {
          color: #d99e45;
        }

        .wrapper {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}
