import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"

export const selectMapMode = (state: RootState) => state.map.mode

export const selectIsDefaultMapMode = (state: RootState) =>
  state.map.mode === "default"

export const selectIsJoinRegionMapMode = (state: RootState) =>
  state.map.mode === "join-region"

export const selectMapOverlay = (state: RootState) => state.map.overlay

export const selectRegions = (state: RootState) => state.map.regions

export const selectRegionById = createSelector(
  [selectRegions, (_, regionId: string) => regionId],
  (regions, regionId) => regions[regionId]
)

export const selectStakingRegionId = (state: RootState) =>
  state.map.stakingRegionId

export const selectStakingRegionAddress = createSelector(
  selectRegions,
  selectStakingRegionId,
  (regions, stakingRegionId) =>
    stakingRegionId && regions[stakingRegionId].regionContractAddress
)
