/* eslint-disable import/prefer-default-export */
import { RealmData } from "shared/types"

export const getPopulationOfRealms = (realms: RealmData[]) =>
  realms.map((realm) => realm.population)
