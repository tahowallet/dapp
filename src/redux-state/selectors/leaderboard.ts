import { createSelector } from "@reduxjs/toolkit"
import { createIslandSelector } from "redux-state/selectors"

export const selectLeaderboards = createIslandSelector("leaderboards")

const selectLeaderboardDataById = createSelector(
  [(_, realmId: string) => realmId, selectLeaderboards],
  (realmId, leaderboards) => leaderboards[realmId]
)

export const selectLeaderboardById = createSelector(
  selectLeaderboardDataById,
  (leaderboardData) => leaderboardData?.leaderboard ?? []
)

export const selectUserLeaderboardRankById = createSelector(
  selectLeaderboardDataById,
  (leaderboardData) => leaderboardData?.currentUser ?? null
)
