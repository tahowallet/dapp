import React from "react"
import Icon from "shared/components/Icon"
import crossIcon from "shared/assets/icons/plus.svg"
import classNames from "classnames"
import { isSameAddress, truncateAddress } from "shared/utils"
import { XpMerkleTreeItem } from "shared/types/xp"

const format = new Intl.NumberFormat()

export default function LeaderboardItem({
  item,
  rank,
  currentUser,
}: {
  item: XpMerkleTreeItem
  rank: number
  currentUser: string
}) {
  const { beneficiary: address, amount } = item
  const isCurrentUser = isSameAddress(address, currentUser)

  return (
    <>
      <li key={item.beneficiary}>
        <div
          className={classNames("leaderboard_item", {
            top_item: rank <= 3,
            is_user: isCurrentUser,
          })}
          data-rank={rank}
        >
          {rank <= 3 && (
            <Icon src={crossIcon} width="16px" color="currentColor" />
          )}
          <span>{rank}</span>
          <span className="address">{truncateAddress(address)}</span>
          <span className="xp">{format.format(BigInt(amount))} XP</span>
        </div>
      </li>
      <style jsx>{`
        .leaderboard_item {
          padding: 0 16px 0 44px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--secondary-s1-70);
          font: 500 18px/1.2 var(--sans);
        }

        .leaderboard_item :is(.top_item, .is_user) {
          border-radius: 8px;
          padding: 12px 16px;
          color: #d0d6d6;
          font: 500 18px/38px var(--sans);
        }

        .leaderboard_item.is_user {
          background: var(--primary-p1-100);
          padding-left: 23px;
        }

        .xp {
          margin-left: auto;
        }

        .leaderboard_item[data-rank="1"] {
          color: #ffc700;
          border: 1px solid currentColor;
          background: rgba(255, 199, 0, 0.1);
        }

        .leaderboard_item[data-rank="2"] {
          color: #d99e45;
          border: 1px solid currentColor;
        }

        .leaderboard_item[data-rank="3"] {
          color: #d0d6d6;
          border: 1px solid currentColor;
        }

        .wrapper {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}
