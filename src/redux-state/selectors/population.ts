import { createSelector } from "@reduxjs/toolkit"
import {
  getDisplayedPopulationOfRealms,
  getPopulationById,
  getPopulationOfRealms,
  sortPopulation,
} from "redux-state/utils/population"

export const selectSortedPopulation = sortPopulation("population")
export const selectSortedDisplayedPopulation = sortPopulation(
  "displayedPopulation"
)

export const selectPopulationById = getPopulationById("population")
export const selectDisplayedPopulationById = getPopulationById(
  "displayedPopulation"
)

export const selectTotalPopulation = createSelector(
  selectSortedPopulation,
  (realms) =>
    realms.length ? getPopulationOfRealms(realms).reduce((a, b) => a + b) : 0
)

export const selectTotalDisplayedPopulation = createSelector(
  selectSortedDisplayedPopulation,
  (realms) =>
    realms.length
      ? getDisplayedPopulationOfRealms(realms).reduce((a, b) => a + b)
      : 0
)

export const selectMaxPopulation = createSelector(
  selectSortedPopulation,
  (realms) => (realms.length ? Math.max(...getPopulationOfRealms(realms)) : 0)
)

export const selectMaxDisplayedPopulation = createSelector(
  selectSortedDisplayedPopulation,
  (realms) =>
    realms.length ? Math.max(...getDisplayedPopulationOfRealms(realms)) : 0
)
