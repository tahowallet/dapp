import { RealmQuestlineData, RealmMapData } from "shared/types"
import arbitrum from "shared/assets/partners/arbitrum.svg"
import cyberconnect from "shared/assets/partners/cyberconnect.svg"
import gitcoin from "shared/assets/partners/gitcoin.svg"
import galxe from "shared/assets/partners/galxe.svg"
import frax from "shared/assets/partners/frax.svg"
import { realm4, realm7, realm8, realm9, realm19, realm22 } from "./realms-data"
import QUESTLINE_DATA from "../../assets/questline-data.json"

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
export function getQuestlineData(id: string): RealmQuestlineData {
  const realmWithQuestline = QUESTLINE_DATA.realms.find(
    ({ realmId }) => realmId === id
  )

  if (!realmWithQuestline) {
    throw new Error(`Missing data for realm ${id}`)
  }

  return realmWithQuestline
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

export const BASE_REALMS_MAP_DATA: RealmMapData[] = [
  realm4,
  realm7,
  realm9,
  realm19,
  realm22,
]

export const NEW_REALMS_MAP_DATA: RealmMapData[] = [realm8]

export const REALMS_MAP_DATA =
  process.env.SHOW_ADDITIONAL_REALMS === "true"
    ? [
        ...BASE_REALMS_MAP_DATA,
        ...NEW_REALMS_MAP_DATA.map((realm) => ({
          ...realm,
          isNew: true, // adding this property to new realms to display "New realm" label
        })),
      ]
    : BASE_REALMS_MAP_DATA

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

export function getRealmPopulationIcon(realmId: string): string {
  const populationIcon = REALMS_MAP_DATA.find((realm) => realm.id === realmId)
    ?.partnerIcons.population

  if (!populationIcon) {
    throw new Error(`Missing population icon for realm ${realmId}`)
  }

  return populationIcon
}

export const REALM_FONT_SIZE = 78
export const REALM_FONT_FAMILY = "QuincyCF"
export const REALM_FONT_STYLE = "bold"
export const REALM_IMAGE_SIZE = 70

export const REALM_ICONS = { arbitrum, cyberconnect, gitcoin, galxe, frax }
