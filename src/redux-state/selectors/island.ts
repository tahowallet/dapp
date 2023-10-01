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

export const selectIslandZoomLevel = (state: RootState) =>
  state.island.zoomLevel
