import { RealmQuestlineData, RealmMapData } from "shared/types"
import { realm19, realm22, realm4, realm7, realm9 } from "./realms-data"
import QUESTLINE_DATA from "../../data/questline-data.json"

// TODO: names and ids may change
export const REALMS_WITH_CONTRACT_NAME: {
  [id: string]: { name: string }
} = {
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

// TODO: read the correct questline data for realms
// The questline data should be read from a JSON file.
// Currently, the structure of the file isn't yet known and should be updated later.
// The data is not yet ready, so it has been mocked.
export function getQuestlineData(
  realmContractAddress: string
): RealmQuestlineData {
  // TODO: Delete when questline data is ready for use
  const realmWithQuestline = QUESTLINE_DATA.realms[0]
  // const realmWithQuestline = QUESTLINE_DATA.realms.find(
  //   ({ realm }) => realm === realmContractAddress
  // )

  if (!realmWithQuestline) {
    throw new Error(`Missing data for realm ${realmContractAddress}`)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { realm, ...questlineData } = realmWithQuestline

  return questlineData
}
// ISLAND_BOX is size of the island image: public/dapp_sland_bg.webp
export const ISLAND_BOX = {
  width: 6085,
  height: 3944,
}

const FIGMA_WORKSPACE_SIZE = {
  width: 1731,
  height: 1117,
}

export const FIGMA_FACTOR = {
  X: ISLAND_BOX.width / FIGMA_WORKSPACE_SIZE.width,
  Y: ISLAND_BOX.height / FIGMA_WORKSPACE_SIZE.height,
}

export const REALMS_MAP_DATA: RealmMapData[] = [
  realm4,
  realm7,
  realm9,
  realm19,
  realm22,
]

export const REALMS_COUNT = REALMS_MAP_DATA.length

export function getRealmMapData(realmId: string): RealmMapData {
  const pathData = REALMS_MAP_DATA.find((realm) => realm.id === realmId)

  if (!pathData) {
    throw new Error(`Missing data for realm ${realmId}`)
  }

  return pathData
}

export function getRealmColor(realmId: string): string {
  const color = REALMS_MAP_DATA.find((realm) => realm.id === realmId)?.color

  if (!color) {
    throw new Error(`Missing color for realm ${realmId}`)
  }

  return color
}
