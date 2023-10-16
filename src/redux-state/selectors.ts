import { createSelector } from "@reduxjs/toolkit"
import { IslandState } from "redux-state/slices/island"
import { RootState } from "./reducers"

export type IslandSelector<K extends keyof IslandState> = (
  state: RootState
) => IslandState[K]

export type CreateIslandSelector = <K extends keyof IslandState>(
  value: K
) => IslandSelector<K>

export const selectIsland = (state: RootState) => state.island

export const createIslandSelector: CreateIslandSelector = (value) =>
  createSelector(selectIsland, (island) => island[value])
