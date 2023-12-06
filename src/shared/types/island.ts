import { Challenge } from "./challenge"
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
  displayedPopulation: number
  xpAllocatable: string
  xpToken: { name: string; symbol: string; contractAddress: string }
}

// Challenges data from JSON file
export type RealmChallengesData = {
  challenges: Challenge[]
}

export type RealmData = RealmAddressesData &
  RealmContractData &
  RealmChallengesData

export type RealmDataWithId = { id: string; data: RealmData }

export type RealmDataById = { [id: string]: RealmData }

export type RealmContractDataWithId = {
  id: string
  data: RealmAddressesData & RealmContractData
}

export type RealmWithStaker = [string, string]

export type XpMerkleTreeItemData = XpMerkleTreeItem & {
  beneficiary: string
}

export type LeaderboardItemData = {
  rank: number
  beneficiary: string
  amount: string
}

export type XPLeaderboard = LeaderboardItemData[]

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
  partnerIcons: { default: string; shadow: string; population: string }
  partnerColor?: string
  isNew?: boolean
  cursorText: string
}
