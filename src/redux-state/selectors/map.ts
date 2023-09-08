import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"

export const selectMapMode = (state: RootState) => state.map.mode

export const selectMapOverlay = (state: RootState) => state.map.overlay

export const selectRegions = (state: RootState) => state.map.regions

export const selectRegionById = createSelector(
  [selectRegions, (_, regionId: string) => regionId],
  (regions, regionId) => regions[regionId]
)
