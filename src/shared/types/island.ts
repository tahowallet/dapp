export type RealmContractData = {
  name: string
  realmContractAddress: string
  veTokenContractAddress: string
  realmName: string
  xpTokenNamePrefix: string
  xpTokenSymbolPrefix: string
}

export type RealmDetails = {
  id: string
  name: string
  description: string
  color: string
  xpfn: string
  quests: { name: string; description: string }[]
}

export type RealmContractDataWithId = { id: string; data: RealmContractData }

export type StakingData = { realmContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"
