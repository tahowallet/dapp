import { RealmDetails } from "shared/types"
import { realm19, realm22, realm4, realm7, realm9 } from "./realms-data"
import { MOCK_REALMS_DETAILS } from "./mock-realms-details"

export const ISLAND_BOX = {
  width: 6085,
  height: 3944,
}

export const realms = [realm4, realm7, realm9, realm19, realm22]

export const REALMS_COUNT = realms.length

export function getRealmDataOnIsland(realmId: string): (typeof realms)[number] {
  const pathData = realms.find((realm) => realm.id === realmId)

  if (!pathData) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return pathData
}

export function getRealmColor(realmId: string): string {
  const color = realms.find((realm) => realm.id === realmId)?.color

  if (!color) {
    throw new Error(`Missing color for realm ${realmId}`)
  }

  return color
}

export function getRealmDetails(realmId: string): RealmDetails {
  const realmDetails = MOCK_REALMS_DETAILS.find((realm) => realm.id === realmId)

  if (!realmDetails) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return realmDetails
}
