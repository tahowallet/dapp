import React, { useEffect, useState } from "react"
import Icon from "shared/components/Icon"
import crossIcon from "shared/assets/icons/plus.svg"
import classNames from "classnames"
import {
  bigIntToDisplayUserAmount,
  isSameAddress,
  resolveAddressToWalletData,
  truncateAddress,
} from "shared/utils"
import { selectWalletAvatar, useDappSelector } from "redux-state"
import { LeaderboardItemData } from "shared/types"

export default function LeaderboardItem({
  item,
  rank,
  currentUser,
}: {
  item: LeaderboardItemData
  rank: number
  currentUser: string
}) {
  const { beneficiary: address, amount } = item
  const isCurrentUser = isSameAddress(address, currentUser)
  const avatar = useDappSelector(selectWalletAvatar)

  const [username, setUsername] = useState("")
  const [walletAvatar, setWalletAvatar] = useState(avatar)

  useEffect(() => {
    const getName = async () => {
      const data = await resolveAddressToWalletData(address)

      if (!data) return

      if (data.name) setUsername(data.name)
      if (data.avatar) setWalletAvatar(data.avatar)
    }
    getName()
  }, [address])

  return (
    <>
      <li key={address}>
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
          <span className="rank">{rank}</span>
          {isCurrentUser && (
            <Icon
              type="image"
              src={walletAvatar}
              width="40px"
              style={{ borderRadius: "100%", backgroundPosition: "center" }}
            />
          )}
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
          padding: 0 16px 0 44px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--secondary-s1-70);
          font: 500 18px/1.2 var(--sans);
          line-height: 28px;
        }

        .leaderboard_item :is(.top_item, .is_user) {
          border-radius: 8px;
          padding: 12px 16px;
          color: #d0d6d6;
          font: 500 18px/38px var(--sans);
        }

        .leaderboard_item.is_user {
          background: var(--primary-p1-100) !important;
          padding-left: 23px;
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
        .is_user .rank {
          width: auto;
        }
        .leaderboard_item[data-rank="1"] {
          color: #ffc700;
          border: 1px solid currentColor;
          background: rgba(255, 199, 0, 0.1);
        }

        .leaderboard_item[data-rank="2"] {
          color: #d0d6d6;
          border: 1px solid currentColor;
        }

        .leaderboard_item[data-rank="3"] {
          color: #d99e45;
          border: 1px solid currentColor;
          margin-bottom: 14px;
        }

        .wrapper {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}
