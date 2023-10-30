import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"
import { DAY } from "shared/constants"
import { isSameAddress } from "shared/utils"

export const selectIslandMode = (state: RootState) => state.island.mode

export const selectIsDefaultIslandMode = (state: RootState) =>
  state.island.mode === "default"

export const selectIsJoinRealmIslandMode = (state: RootState) =>
  state.island.mode === "join-realm"

export const selectIslandOverlay = (state: RootState) => state.island.overlay

export const selectRealms = (state: RootState) => state.island.realms

export const selectRealmById = createSelector(
  [selectRealms, (_, realmId: string | null) => realmId],
  (realms, realmId) => (realmId ? realms[realmId] : null)
)

export const selectRealmNameById = createSelector(
  [selectRealms, (_, realmId: string | null) => realmId],
  (realms, realmId) => (realmId ? realms[realmId].name : null)
)

export const selectRealmWithIdByAddress = createSelector(
  [selectRealms, (_, realmAddress: string) => realmAddress],
  (realms, realmAddress) =>
    Object.entries(realms).find(([_, { realmContractAddress }]) =>
      isSameAddress(realmContractAddress, realmAddress)
    )
)

export const selectHasLoadedRealmData = createSelector(
  selectRealms,
  (realms) => Object.keys(realms).length !== 0
)

export const selectHasLoadedSeasonInfo = createSelector(
  (state: RootState) => state.island.seasonInfo,
  (seasonInfo) => seasonInfo !== null
)

/* Season info  - selectors */
export const selectSeasonStartTimestamp = (state: RootState) =>
  state.island.seasonInfo?.seasonStartTimestamp

export const selectSeasonEndTimestamp = (state: RootState) =>
  state.island.seasonInfo?.seasonEndTimestamp

export const selectSeasonDurationInWeeks = (state: RootState) =>
  state.island.seasonInfo?.durationInWeeks

export const selectIsEndOfSeason = createSelector(
  selectSeasonEndTimestamp,
  (seasonEndTimestamp) => {
    if (seasonEndTimestamp) {
      return Date.now() > seasonEndTimestamp
    }
    return null
  }
)

export const selectSeasonWeek = createSelector(
  selectSeasonStartTimestamp,
  selectIsEndOfSeason,
  selectSeasonDurationInWeeks,
  (seasonStartTimestamp, isEndOfSeason, durationInWeeks) => {
    if (isEndOfSeason) return durationInWeeks

    if (seasonStartTimestamp && durationInWeeks) {
      const hasSeasonStarted = seasonStartTimestamp < Date.now()
      if (!hasSeasonStarted) return 1 // if the start date is placed in the future, set season week to 1

      return Math.trunc((Date.now() - seasonStartTimestamp) / (7 * DAY) + 1)
    }

    return null
  }
)

export const selectWeekStartDate = createSelector(
  selectSeasonStartTimestamp,
  selectSeasonWeek,
  (seasonStartTimestamp, seasonWeek) => {
    if (seasonStartTimestamp && seasonWeek) {
      const startDate = new Date(seasonStartTimestamp)
      startDate.setDate(startDate.getDate() + (seasonWeek - 1) * 7)
      return startDate
    }
    return null
  }
)

export const selectWeekEndDate = createSelector(
  selectWeekStartDate,
  (startDate) => {
    if (!startDate) return null

    const endDate = new Date()
    endDate.setDate(startDate.getDate() + 6)
    return endDate
  }
)

/* Displayed Realm - selectors */
export const selectDisplayedRealmId = (state: RootState) =>
  state.island.displayedRealmId

export const selectDisplayedRealmAddress = createSelector(
  selectRealms,
  selectDisplayedRealmId,
  (realms, realmId) => realmId && realms[realmId]?.realmContractAddress
)

export const selectDisplayedRealmVeTokenAddress = createSelector(
  selectRealms,
  selectDisplayedRealmId,
  (realms, realmId) => realmId && realms[realmId]?.veTokenContractAddress
)

/* Staking Realm - selectors */
export const selectStakingRealmId = (state: RootState) =>
  state.island.stakingRealmId

export const selectStakingRealmAddress = createSelector(
  selectRealms,
  selectStakingRealmId,
  (realms, stakingRealmId) =>
    stakingRealmId && realms[stakingRealmId]?.realmContractAddress
)

/* Xp selectors */
export const selectLeaderboards = (state: RootState) =>
  state.island.leaderboards

export const selectUnclaimedXp = (state: RootState) => state.island.unclaimedXp

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

export const selectUnclaimedXpById = createSelector(
  [(_, realmId: string) => realmId, selectUnclaimedXp],
  (realmId, unclaimedXp) => unclaimedXp[realmId]
)

export const selectUnclaimedXpSumById = createSelector(
  [selectUnclaimedXpById],
  (unclaimedXp) =>
    unclaimedXp?.reduce((acc, item) => acc + BigInt(item.claim.amount), 0n) ??
    0n
)
/* Population - selectors */
export const selectSortedPopulation = createSelector(selectRealms, (realms) => {
  const realmsData = Object.entries(realms).map(([id, data]) => ({
    id,
    ...data,
  }))

  const sortedRealms = realmsData.sort((a, b) => a.population - b.population)
  return sortedRealms
})

export const selectPopulationById = createSelector(
  selectRealmById,
  (realm) => realm?.population ?? 0
)

export const selectTotalPopulation = createSelector(
  selectSortedPopulation,
  (realms) =>
    realms.length
      ? realms.map((realm) => realm.population).reduce((a, b) => a + b)
      : 0
)

export const selectMaxPopulation = createSelector(
  selectSortedPopulation,
  (realms) =>
    realms.length ? Math.max(...realms.map((realm) => realm.population)) : 0
)

/* Helpful selectors */
export const selectIsStakingRealmDisplayed = createSelector(
  selectStakingRealmAddress,
  selectDisplayedRealmAddress,
  (stakingAddress, displayedAddress) =>
    !!stakingAddress &&
    !!displayedAddress &&
    isSameAddress(stakingAddress, displayedAddress)
)

export const selectStakeUnlockTime = (state: RootState) =>
  state.island.stakeUnlockTime

export const selectIslandZoomLevel = (state: RootState) =>
  state.island.zoomLevel
