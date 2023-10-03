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
  // TODO: Finally, custom data should be taken from the following link
  questlineUrl: string
}

// Custom data from JSON file
export type RealmCustomData = {
  color: string
  xpfn: string
  description: string
  quests: { name: string; description: string }[]
}

export type RealmData = RealmAddressesData & RealmContractData & RealmCustomData

export type RealmDataWithId = { id: string; data: RealmData }

export type RealmWithStaker = [string, string]

export type StakingData = { realmContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"
