import { createSelector } from "@reduxjs/toolkit"
import { createIslandSelector } from "redux-state/selectors"
import { IslandModeType } from "redux-state/slices/island"

export const selectIslandMode = createIslandSelector("mode")
export const selectIslandOverlay = createIslandSelector("overlay")
export const selectIslandZoomLevel = createIslandSelector("zoomLevel")

const checkIslandMode = (value: IslandModeType) =>
  createSelector(selectIslandMode, (mode) => mode === value)

export const selectIsDefaultIslandMode = checkIslandMode("default")
export const selectIsJoinRealmIslandMode = checkIslandMode("join-realm")
