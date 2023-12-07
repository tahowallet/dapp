import React, { CSSProperties } from "react"
import {
  selectDisplayedRealmId,
  selectUserLeaderboardRankById,
  selectWalletAvatar,
  selectWalletName,
  useDappSelector,
} from "redux-state"
import Icon from "shared/components/Media/Icon"
import {
  bigIntToDisplayUserAmount,
  separateThousandsByComma,
} from "shared/utils"

export default function LeaderboardCurrentUser({
  style,
}: {
  style?: CSSProperties
}) {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const avatar = useDappSelector(selectWalletAvatar)
  const name = useDappSelector(selectWalletName)
  const userRank = useDappSelector((state) =>
    realmId ? selectUserLeaderboardRankById(state, realmId) : null
  )

  if (!userRank) return null

  const rankNumber = separateThousandsByComma(userRank.rank, 0)

  return (
    <>
      <div className="container row_center" style={style}>
        <div className="rank_container row_center">
          <span>Your rank</span>
          <span className="rank">{rankNumber}</span>
        </div>

        <div className="user_container column">
          <div className="row_center">
            <Icon
              type="image"
              src={avatar}
              width="25px"
              style={{
                borderRadius: "100%",
                backgroundPosition: "center",
                marginRight: "10px",
              }}
            />
            <div className="user_name ellipsis">{name}</div>
          </div>
          <div className="xp_amount">
            {bigIntToDisplayUserAmount(userRank.amount, 18, 0)} XP
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          padding: 16px 0;
          border-radius: 8px;
          border: 2px solid var(--trading-in);
          background-color: var(--trading-in-20);
          justify-content: space-between;
        }
        .rank_container {
          flex-shrink: 0;
          padding: 0 16px;
          gap: 12px;
          font: var(--text-label);
          font-weight: 700;
          color: #0d2220;
          background: var(--trading-in);
          border-radius: 0px 48px 48px 0px;
        }
        .rank {
          font: var(--text-h2-alt);
          letter-spacing: 0.5px;
        }
        .user_container {
          flex-shrink: 0;
          text-align: right;
          color: var(--secondary-s1-80);
          padding: 0 16px;
          gap: 2px;
        }
        .xp_amount {
          color: var(--secondary-s1-100);
          font-size: 22px;
          font-style: normal;
          font-weight: 600;
          line-height: 32px;
        }
        .user_name {
          max-width: 140px;
        }
      `}</style>
    </>
  )
}
