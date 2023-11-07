import { createSelector } from "@reduxjs/toolkit"
import { selectRealmById, selectRealms } from "redux-state/selectors/realm"
import { RealmData } from "shared/types"

type PopulationKey = "population" | "displayedPopulation"

export const getPopulationOfRealms = (realms: RealmData[]) =>
  realms.map((realm) => realm.population)

export const getDisplayedPopulationOfRealms = (realms: RealmData[]) =>
  realms.map((realm) => realm.displayedPopulation)

export const getPopulationById = (key: PopulationKey) =>
  createSelector(selectRealmById, (realm) => realm?.[key] ?? 0)

export const sortPopulation = (key: PopulationKey) =>
  createSelector(selectRealms, (realms) => {
    const realmsData = Object.entries(realms).map(([id, data]) => ({
      id,
      ...data,
    }))

    return realmsData.sort((a, b) => a[key] - b[key])
  })
