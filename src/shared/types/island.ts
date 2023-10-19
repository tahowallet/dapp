import { XpDistributor, XpMerkleTreeItem } from "./xp"

// Data from Taho Deployer contract
export type RealmAddressesData = {
  realmContractAddress: string
  veTokenContractAddress: string
}

// Data from Realm contract
export type RealmContractData = {
  name: string
  population: number
  merkleDataUrl: string
  xpAllocatable: bigint
  xpToken: { name: string; symbol: string; contractAddress: string }
}

// Questline data from JSON file
export type RealmQuestlineData = {
  description: string
  questlineName: string
  quests: { name: string; description: string }[]
}

export type RealmData = RealmAddressesData &
  RealmContractData &
  RealmQuestlineData

export type RealmDataWithId = { id: string; data: RealmData }

export type RealmContractDataWithId = {
  id: string
  data: RealmAddressesData & RealmContractData
}

export type RealmWithStaker = [string, string]

export type LeaderboardItemData = XpMerkleTreeItem & { rank: number }

export type LeaderboardData = {
  currentUser: null | LeaderboardItemData
  leaderboard: LeaderboardItemData[]
}

export type UnclaimedXpData = XpDistributor & {
  claim: XpMerkleTreeItem
}

export type StakingData = { realmContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"

export type SeasonInfo = {
  season: number
  seasonStartTimestamp: number
  seasonEndTimestamp: number
  isInterSeason: boolean
  durationInWeeks: number
}

export type RealmMapData = {
  id: string
  h: number
  w: number
  x: number
  y: number
  paths: { windingRule: string; data: string }[]
  realmType: string
  color: string
  labelX: number
  labelY: number
  partnerLogo: { default: string; shadow: string }
  partnerColor?: string
}
