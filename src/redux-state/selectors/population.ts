import { createSelector } from "@reduxjs/toolkit"
import {
  getPopulationOfRealms,
  getDisplayedPopulationOfRealms,
} from "redux-state/utils"
import { PopulationKey } from "shared/types/selectors"
import { selectRealmById, selectRealms } from "./realm"

const getPopulationById = (key: PopulationKey) =>
  createSelector(selectRealmById, (realm) => realm?.[key] ?? 0)

const sortPopulation = (key: PopulationKey) =>
  createSelector(selectRealms, (realms) => {
    const realmsData = Object.entries(realms).map(([id, data]) => ({
      id,
      ...data,
    }))

    return realmsData.sort((a, b) => a[key] - b[key])
  })

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
  (realms) =>
    realms.length ? getPopulationOfRealms(realms)[realms.length - 1] : 0
)

export const selectMaxDisplayedPopulation = createSelector(
  selectSortedDisplayedPopulation,
  (realms) =>
    realms.length
      ? getDisplayedPopulationOfRealms(realms)[realms.length - 1]
      : 0
)
