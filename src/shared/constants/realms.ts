import { RealmCustomData } from "shared/types"
import { realm19, realm22, realm4, realm7, realm9 } from "./realms-data"
import CUSTOM_DATA from "./realms-details.json"

// TODO: names and ids may change
export const REALMS_WITH_CONTRACT_NAME: { [id: string]: { name: string } } = {
  "4": {
    name: "VAMPIRE_REALM",
  },
  "7": {
    name: "EDUCATE_REALM",
  },
  "9": {
    name: "SOCIAL_REALM",
  },
  "19": {
    name: "CREATORS_REALM",
  },
  "22": {
    name: "DEFI_REALM",
  },
}

// TODO: read the correct custom data for realms
// The custom data should be read from a JSON file.
// Currently, the structure of the file isn't yet known and should be updated later.
// The data is not yet ready, so it has been mocked.
export function getRealmCustomData(
  realmId: string
): { realmName: string } & RealmCustomData {
  const realms = CUSTOM_DATA.realms.find((realm) => realm.id === realmId)

  if (!realms) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return realms
}

export const ISLAND_BOX = {
  width: 6085,
  height: 3944,
}

export const realms = [realm4, realm7, realm9, realm19, realm22].map(
  (realm) => {
    const { color, realmName } = getRealmCustomData(realm.id)
    return { ...realm, color, realmName }
  }
)

export const REALMS_COUNT = realms.length

export function getRealmMapData(realmId: string): (typeof realms)[number] {
  const pathData = realms.find((realm) => realm.id === realmId)

  if (!pathData) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return pathData
}
