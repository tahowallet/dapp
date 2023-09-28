// Custom data from JSON file
export type RealmCustomData = {
  color: string
  xpfn: string
  description: string
  quests: { name: string; description: string }[]
}

export type RealmData = RealmCustomData & {
  // Data from Taho Deployer contract
  realmContractAddress: string
  veTokenContractAddress: string
  // Data from Realm contract
  realmName: string
  xpTokenNamePrefix: string
  xpTokenSymbolPrefix: string
  questlineUrl: string
}

export type RealmDataWithId = { id: string; data: RealmData }

export type StakingData = { realmContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"
