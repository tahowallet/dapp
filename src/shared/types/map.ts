export type RegionContractData = {
  name: string
  regionContractAddress: string | null
}

export type RegionContractDataWithId = { id: string; data: RegionContractData }

export type StakingData = { regionContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"
