import { createSelector } from "@reduxjs/toolkit"
import { RealmData } from "shared/types"
import { selectRealmById, selectRealms } from "./realm"

const getPopulationOfRealms = (realms: RealmData[]) =>
  realms.map((realm) => realm.population)

export const selectSortedPopulation = createSelector(selectRealms, (realms) => {
  const realmsData = Object.entries(realms).map(([id, data]) => ({
    id,
    ...data,
  }))

  return realmsData.sort((a, b) => a.population - b.population)
})

export const selectPopulationById = createSelector(
  selectRealmById,
  (realm) => realm?.population ?? 0
)

export const selectTotalPopulation = createSelector(
  selectSortedPopulation,
  (realms) =>
    realms.length ? getPopulationOfRealms(realms).reduce((a, b) => a + b) : 0
)

export const selectMaxPopulation = createSelector(
  selectSortedPopulation,
  (realms) => (realms.length ? Math.max(...getPopulationOfRealms(realms)) : 0)
)
