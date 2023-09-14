import { StakingData, WriteTransactionBuilder } from "shared/types"
import { getRegionContract } from "./regions"

export const stake: WriteTransactionBuilder<StakingData> = async (
  provider,
  _,
  { regionContractAddress, amount }
) => {
  const regionTokenContract = await getRegionContract(provider, {
    regionContractAddress,
  })

  return regionTokenContract.populateTransaction.stake(amount)
}

export const unstake: WriteTransactionBuilder<StakingData> = async (
  provider,
  _,
  { regionContractAddress, amount }
) => {
  const regionTokenContract = await getRegionContract(provider, {
    regionContractAddress,
  })

  return regionTokenContract.populateTransaction.unstake(amount)
}
