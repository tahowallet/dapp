import { RealmDetails } from "shared/types"
import { realm19, realm22, realm4, realm7, realm9 } from "./realms-data"
import CUSTOM_DATA from "./realms-details.json"

// TODO: read the correct custom data for realms
// The custom data should be read from a JSON file.
// Currently, the structure of the file isn't yet known and should be updated later.
// The data is not yet ready, so it has been mocked.
export function getRealmDetails(realmId: string): RealmDetails {
  const realmDetails = CUSTOM_DATA.realms.find((realm) => realm.id === realmId)

  if (!realmDetails) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return realmDetails
}

export const ISLAND_BOX = {
  width: 6085,
  height: 3944,
}

export const realms = [realm4, realm7, realm9, realm19, realm22].map(
  (realm) => {
    const { color, name } = getRealmDetails(realm.id)
    return { ...realm, color, name }
  }
)

export const REALMS_COUNT = realms.length

export function getRealmDataOnIsland(realmId: string): (typeof realms)[number] {
  const pathData = realms.find((realm) => realm.id === realmId)

  if (!pathData) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return pathData
}
