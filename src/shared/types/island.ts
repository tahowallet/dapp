export type RegionContractData = {
  name: string
  realmContractAddress: string | null
}

export type RegionContractDataWithId = { id: string; data: RegionContractData }

export type StakingData = { realmContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"
