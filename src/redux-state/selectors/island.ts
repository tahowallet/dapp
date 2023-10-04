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

export const selectRealmWithIdByAddress = createSelector(
  [selectRealms, (_, realmAddress: string) => realmAddress],
  (realms, realmAddress) =>
    Object.entries(realms).find(([_, { realmContractAddress }]) =>
      isSameAddress(realmContractAddress, realmAddress)
    )
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

export const selectSortedPopulation = (state: RootState) => {
  const fetchedData = Object.entries(state.island.realms).map(([id, data]) => ({
    id,
    ...data,
  }))

  const sortedRealms = fetchedData.sort((a, b) => a.population - b.population)
  return sortedRealms
}

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

export const selectPopulationById = createSelector(
  selectRealmById,
  (realm) => realm?.population ?? 0
)

export const selectAssistant = (state: RootState) => state.island.assistant
