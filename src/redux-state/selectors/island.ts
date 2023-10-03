import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"
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

export const selectStakeUnlockTime = (state: RootState) =>
  state.island.stakeUnlockTime

export const selectIslandZoomLevel = (state: RootState) =>
  state.island.zoomLevel

// TODO: Delete when the season date has been set
export const selectSeasonStartTimestamp = (state: RootState) =>
  state.island.seasonInfo?.seasonStartTimestamp || Date.now()

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

/* Helpful selectors */
export const selectIsStakingRealmDisplayed = createSelector(
  selectStakingRealmAddress,
  selectDisplayedRealmAddress,
  (stakingAddress, displayedAddress) =>
    !!stakingAddress &&
    !!displayedAddress &&
    isSameAddress(stakingAddress, displayedAddress)
)

export const selectSeasonWeek = createSelector(
  selectSeasonStartTimestamp,
  (seasonStartTimestamp) =>
    seasonStartTimestamp ? (Date.now() - seasonStartTimestamp) / 7 + 1 : null
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
