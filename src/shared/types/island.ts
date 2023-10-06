// Data from Taho Deployer contract
export type RealmAddressesData = {
  realmContractAddress: string
  veTokenContractAddress: string
}

// Data from Realm contract
export type RealmContractData = {
  name: string
  xpTokenNamePrefix: string
  xpTokenSymbolPrefix: string
  population: number
  merkleDataUrl: string
}

// Questline data from JSON file
export type RealmQuestlineData = {
  questlineUrl: string
  questlineHash: string
  description: string
  questlineName: string
  quests: { name: string; description: string }[]
}

export type RealmData = RealmAddressesData &
  RealmContractData &
  RealmQuestlineData

export type RealmDataWithId = { id: string; data: RealmData }

export type RealmWithStaker = [string, string]

export type StakingData = { realmContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"

export type SeasonInfo = {
  season: number
  seasonStartTimestamp: number
  seasonEndTimestamp: number
  isInterSeason: boolean
  durationInWeeks: number
}
