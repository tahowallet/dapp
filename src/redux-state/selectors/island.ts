import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"
import { isSameAddress } from "shared/utils"

export const selectIslandMode = (state: RootState) => state.island.mode

export const selectIsDefaultIslandMode = (state: RootState) =>
  state.island.mode === "default"

export const selectIsJoinRegionIslandMode = (state: RootState) =>
  state.island.mode === "join-realm"

export const selectIslandOverlay = (state: RootState) => state.island.overlay

export const selectRealms = (state: RootState) => state.island.realms

export const selectRegionById = createSelector(
  [selectRealms, (_, realmId: string) => realmId],
  (realms, realmId) => realms[realmId]
)

export const selectStakingRegionId = (state: RootState) =>
  state.island.stakingRegionId

export const selectStakingRegionAddress = createSelector(
  selectRealms,
  selectStakingRegionId,
  (realms, stakingRegionId) =>
    stakingRegionId && realms[stakingRegionId]?.realmContractAddress
)

export const selectDisplayedRegionId = (state: RootState) =>
  state.island.displayedRegionId

export const selectDisplayedRegionAddress = createSelector(
  selectRealms,
  selectDisplayedRegionId,
  (realms, realmId) => realmId && realms[realmId]?.realmContractAddress
)

export const selectIsStakingRegionDisplayed = createSelector(
  selectStakingRegionAddress,
  selectDisplayedRegionAddress,
  (stakingAddress, displayedAddress) =>
    !!stakingAddress &&
    !!displayedAddress &&
    isSameAddress(stakingAddress, displayedAddress)
)
