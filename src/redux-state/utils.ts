import { RealmData } from "shared/types"

export const getPopulationOfRealms = (realms: RealmData[]) =>
  realms.map((realm) => realm.population)

export const getDisplayedPopulationOfRealms = (realms: RealmData[]) =>
  realms.map((realm) => realm.displayedPopulation)
