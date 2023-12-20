import { RealmChallengesData, RealmMapData } from "shared/types"
import arbitrum from "shared/assets/partners/arbitrum.svg"
import cyberconnect from "shared/assets/partners/cyberconnect.svg"
import gitcoin from "shared/assets/partners/gitcoin.svg"
import galxe from "shared/assets/partners/galxe.svg"
import frax from "shared/assets/partners/frax.svg"
import base from "shared/assets/partners/base.svg"
import zksync from "shared/assets/partners/zksync.svg"
import { RealmPosition } from "shared/types/realm"
import {
  realm4,
  realm7,
  realm8,
  realm9,
  realm15,
  realm19,
  realm22,
  // realm15,
} from "./realms-data"
import CHALLENGES_DATA from "../../assets/challenges-data.json"

// TODO: read the correct challenge data for realms
// The challenge data should be read from a JSON file.
// Currently, the structure of the file isn't yet known and should be updated later.
// The data is not yet ready, so it has been mocked.
export function getChallengesData(id: string): RealmChallengesData {
  const realmWithChallenges = CHALLENGES_DATA.realms.find(
    ({ realmId }) => realmId === id
  )

  if (!realmWithChallenges) return { challenges: [] }

  return realmWithChallenges
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

export const REALMS_WITH_CONTRACT_ADDRESS: {
  [id: string]: { address: string }
} = {
  "4": {
    // Gitcoin
    address: "0xa5853ca1eac56bf78213b8300b695e7cfa563b4a",
  },
  "7": {
    // CyberConnect
    address: "0x06894597d381542a55d2946e20117c29dbae2351",
  },
  "8": {
    // Base
    address: "0xc92AF0c1f3111254b73eea97D803155b1E542Ee3",
  },
  "9": {
    // Arbitrum
    address: "0x42a0b5cab976d7a2a0038138dd1279b96b73f029",
  },
  "15": {
    // zkSync
    address: "0x26770639eB1262cfA47A4C3Aa27902fa8FCA3465",
  },
  "19": {
    // Galxe
    address: "0x6a3d1d9a7eb615be82b5c50bba8c6ecc7606afe6",
  },
  "22": {
    // Frax
    address: "0xdc053c0beed726ee6316d4d04135d755466522c8",
  },
}

export const BASE_REALMS_MAP_DATA: RealmMapData[] = [
  realm4,
  realm7,
  realm8,
  realm9,
  realm19,
  realm22,
]

export const NEW_REALMS_MAP_DATA: RealmMapData[] = [realm15]

export const REALMS_MAP_DATA = [
  ...BASE_REALMS_MAP_DATA,
  ...NEW_REALMS_MAP_DATA.map((realm) => ({
    ...realm,
    isNew: true, // adding this property to new realms to display "New realm" label
  })),
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

export function getRealmPosition(realmId: string): RealmPosition {
  const selectedRealm = REALMS_MAP_DATA.find((realm) => realm.id === realmId)

  if (!selectedRealm) {
    throw new Error(`Missing color for realm ${realmId}`)
  }

  return {
    x: selectedRealm.x,
    y: selectedRealm.y,
    width: selectedRealm.w,
    height: selectedRealm.h,
  }
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
export const REALM_PANEL_ANIMATION_TIME = 400

export const REALM_ICONS = {
  arbitrum,
  cyberconnect,
  gitcoin,
  galxe,
  frax,
  base,
  zksync,
}
