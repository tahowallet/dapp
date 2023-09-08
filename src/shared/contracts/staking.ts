import { providers } from "ethers"
import { getRegionContract } from "./regions"

export type StakingData = { regionContractAddress: string; amount: bigint }

export async function stake(
  provider: providers.Provider,
  _: string,
  { regionContractAddress, amount }: StakingData
) {
  const regionTokenContract = getRegionContract(provider, regionContractAddress)

  return regionTokenContract.populateTransaction.stake(amount)
}

export async function unstake(
  provider: providers.Provider,
  _: string,
  { regionContractAddress, amount }: StakingData
) {
  const regionTokenContract = getRegionContract(provider, regionContractAddress)

  return regionTokenContract.populateTransaction.unstake(amount)
}
