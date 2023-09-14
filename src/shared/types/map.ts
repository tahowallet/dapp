export type RegionContractData = {
  name: string
  regionContractAddress: string | null
}

export type StakingData = { regionContractAddress: string; amount: bigint }

export type OverlayType = "dark" | "subtle" | "none"
