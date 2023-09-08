import { RootState } from "redux-state/reducers"

export const selectMapMode = (state: RootState) => state.map.mode

export const selectIsDefaultMapMode = (state: RootState) =>
  state.map.mode === "default"

export const selectIsJoinRegionMapMode = (state: RootState) =>
  state.map.mode === "join-region"

export const selectMapOverlay = (state: RootState) => state.map.overlay
