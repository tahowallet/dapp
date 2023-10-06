import React, { useEffect, useState } from "react"

import {
  selectDisplayedRealmAddress,
  selectDisplayedRealmId,
  selectWalletAddress,
  useDappSelector,
} from "redux-state"
import { XpMerkleTreeItem } from "shared/types/xp"
import {
  getRealmXPSorted,
  getRealmXpData,
  getUserXPRank,
} from "shared/utils/xp"
import LeaderboardItem from "./LeaderboardItem"

export default function LeaderboardList() {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realmAddress = useDappSelector(selectDisplayedRealmAddress)
  const address = useDappSelector(selectWalletAddress)

  const [leaderboardXp, setLeaderboardXp] = useState<XpMerkleTreeItem[] | null>(
    null
  )
  const [userXp, setUserXp] = useState<
    ({ rank: number } & XpMerkleTreeItem) | null
  >(null)

  useEffect(() => {
    const fetchXp = async () => {
      if (realmId && realmAddress && address) {
        // TODO: Leaderboard should be based on sum of all drops
        const xpData = await getRealmXpData({
          id: realmId,
          address: realmAddress,
          dropIndex: 1,
        })

        if (xpData) {
          const sorted = getRealmXPSorted(xpData)
          const leaderboard = sorted.slice(0, 10)

          const user = getUserXPRank(sorted, address)

          setLeaderboardXp(leaderboard)
          setUserXp(user)
        }
      }
    }

    fetchXp()
  }, [realmId, realmAddress, address])

  if (leaderboardXp === null) {
    return null
  }

  return (
    <>
      <ul>
        {userXp && userXp.rank > 10 && (
          <LeaderboardItem
            item={userXp}
            rank={userXp.rank}
            currentUser={address}
          />
        )}
        {leaderboardXp.map((item, index) => (
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
