export type RealmContractData = {
  name: string
  realmContractAddress: string | null
  veTokenContractAddress: string | null
}

export type RealmDetails = {
  name: string
  description: string
  xpfn: string
  quests: { name: string; description: string }[]
}

export type RealmContractDataWithId = { id: string; data: RealmContractData }

export type StakingData = { realmContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"
