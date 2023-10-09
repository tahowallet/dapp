import React from "react"

import {
  selectDisplayedRealmId,
  selectLeaderboardById,
  selectUserLeaderboardRankById,
  selectWalletAddress,
  useDappSelector,
} from "redux-state"
import LeaderboardItem from "./LeaderboardItem"

export default function LeaderboardList() {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const address = useDappSelector(selectWalletAddress)

  const leaderboardList = useDappSelector((state) =>
    realmId ? selectLeaderboardById(state, realmId) : []
  )

  const userRank = useDappSelector((state) =>
    realmId ? selectUserLeaderboardRankById(state, realmId) : null
  )

  if (!leaderboardList.length) {
    return null
  }

  return (
    <>
      <ul>
        {userRank && userRank.rank > 10 && (
          <LeaderboardItem
            item={userRank}
            rank={userRank.rank}
            currentUser={address}
          />
        )}
        {leaderboardList.map((item, index) => (
          <LeaderboardItem
            item={item}
            rank={index + 1}
            key={item.beneficiary}
            currentUser={address}
          />
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>
    </>
  )
}
