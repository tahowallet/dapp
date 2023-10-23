import { createSelector } from "@reduxjs/toolkit"
import { DAY } from "shared/constants"
import { isSameAddress } from "shared/utils"
import { createIslandSelector } from "redux-state/selectors"
import { IslandModeType } from "redux-state/slices/island"
import { RealmData, SeasonInfo } from "shared/types"
import { RootState } from "redux-state/reducers"

type SeasonInfoProperty = <K extends keyof SeasonInfo>(
  value: K
) => (state: RootState) => SeasonInfo[K] | undefined

type DisplayedRealmProperty = <K extends keyof RealmData>(
  value: K
) => (state: RootState) => RealmData[K] | undefined

/* Base selectors */
export const selectIslandMode = createIslandSelector("mode")
export const selectIslandOverlay = createIslandSelector("overlay")
export const selectIslandZoomLevel = createIslandSelector("zoomLevel")
export const selectRealms = createIslandSelector("realms")
export const selectSeasonInfo = createIslandSelector("seasonInfo")
export const selectDisplayedRealmId = createIslandSelector("displayedRealmId")
export const selectLeaderboards = createIslandSelector("leaderboards")
export const selectUnclaimedXp = createIslandSelector("unclaimedXp")
export const selectStakeUnlockTime = createIslandSelector("stakeUnlockTime")
export const selectStakingRealmId = createIslandSelector("stakingRealmId")

/* Helpers */
const checkIslandMode = (value: IslandModeType) =>
  createSelector(selectIslandMode, (mode) => mode === value)

const selectSeasonInfoProperty: SeasonInfoProperty = (value) =>
  createSelector(selectSeasonInfo, (seasonInfo) =>
    seasonInfo ? seasonInfo[value] : undefined
  )

/* Island info - selectors */
export const selectIsDefaultIslandMode = checkIslandMode("default")
export const selectIsJoinRealmIslandMode = checkIslandMode("join-realm")

/* Realms info - selectors */
export const selectRealmById = createSelector(
  [selectRealms, (_, realmId: string | null) => realmId],
  (realms, realmId) => (realmId ? realms[realmId] : null)
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
export const selectSeasonStartTimestamp = selectSeasonInfoProperty(
  "seasonStartTimestamp"
)

export const selectSeasonEndTimestamp =
  selectSeasonInfoProperty("seasonEndTimestamp")

export const selectSeasonDurationInWeeks =
  selectSeasonInfoProperty("durationInWeeks")

export const selectIsEndOfSeason = createSelector(
  selectSeasonEndTimestamp,
  (seasonEndTimestamp) =>
    seasonEndTimestamp ? Date.now() > seasonEndTimestamp : null
)

export const selectSeasonWeek = createSelector(
  selectSeasonStartTimestamp,
  selectIsEndOfSeason,
  selectSeasonDurationInWeeks,
  (seasonStartTimestamp, isEndOfSeason, durationInWeeks) => {
    if (isEndOfSeason) return durationInWeeks

    if (seasonStartTimestamp && durationInWeeks) {
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
const selectDisplayedRealmProperty: DisplayedRealmProperty = (value) =>
  createSelector(selectRealms, selectDisplayedRealmId, (realms, realmId) =>
    realmId && realms[realmId] ? realms[realmId][value] : undefined
  )

export const selectDisplayedRealmAddress = selectDisplayedRealmProperty(
  "realmContractAddress"
)

export const selectDisplayedRealmVeTokenAddress = selectDisplayedRealmProperty(
  "veTokenContractAddress"
)

/* Staking Realm - selectors */
export const selectStakingRealmAddress = createSelector(
  selectRealms,
  selectStakingRealmId,
  (realms, stakingRealmId) =>
    stakingRealmId && realms[stakingRealmId]?.realmContractAddress
)

/* Leaderboard selectors */
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

/* Xp selectors */
export const selectUnclaimedXpById = createSelector(
  [(_, realmId: string) => realmId, selectUnclaimedXp],
  (realmId, unclaimedXp) => unclaimedXp[realmId]
)

export const selectUnclaimedXpSumById = createSelector(
  [selectUnclaimedXpById],
  (unclaimedXp) =>
    unclaimedXp?.reduce(
      (acc, item) => acc + parseInt(item.claim.amount, 16),
      0
    ) ?? 0
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
