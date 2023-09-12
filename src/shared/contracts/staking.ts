import { providers } from "ethers"
import { StakingData } from "shared/types"
import { getRegionContract } from "./regions"

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
