import { realm19, realm22, realm4, realm7, realm9 } from "./realms-data"

export const ISLAND_BOX = {
  width: 6085,
  height: 3944,
}

export const realms = [realm4, realm7, realm9, realm19, realm22]

export const REALMS_COUNT = realms.length

export function getRealmData(realmId: string): (typeof realms)[number] {
  const pathData = realms.find((realm) => realm.id === realmId)

  if (!pathData) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return pathData
}
