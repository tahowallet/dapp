import React from "react"
import placeholderLeaderboard from "shared/assets/placeholder-leaderboard.png"

import {
  selectDisplayedRealmId,
  selectLeaderboardById,
  useDappSelector,
} from "redux-state"
import LeaderboardItem from "./LeaderboardItem"
import RealmDetailsPlaceholder from "../../../shared/components/Media/Placeholder"

const leaderboardDateAvailable = "Dec 14"

export default function LeaderboardList() {
  const realmId = useDappSelector(selectDisplayedRealmId)

  const leaderboardList = useDappSelector((state) =>
    realmId ? selectLeaderboardById(state, realmId) : []
  )

  if (!leaderboardList.length) {
    return (
      <RealmDetailsPlaceholder
        title={`Available after\n${leaderboardDateAvailable}`}
        imageSrc={placeholderLeaderboard}
      />
    )
  }

  return (
    <>
      <ul>
        {leaderboardList.map((item, index) => (
          <LeaderboardItem
            item={item}
            rank={index + 1}
            key={item.beneficiary}
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
