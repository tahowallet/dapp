/* eslint-disable import/prefer-default-export */
import { RealmDataById } from "shared/types"

export function isDisplayedPopulationAvailable(realms: RealmDataById) {
  return Object.values(realms)
    .map((realm) => realm.displayedPopulation)
    .some((population) => population !== undefined)
}
