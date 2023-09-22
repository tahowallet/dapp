import { StakingData, WriteTransactionBuilder } from "shared/types"
import { getRegionContract } from "./realms"

export const stake: WriteTransactionBuilder<StakingData> = async (
  provider,
  _,
  { realmContractAddress, amount }
) => {
  const realmTokenContract = await getRegionContract(provider, {
    realmContractAddress,
  })

  return realmTokenContract.populateTransaction.stake(amount)
}

export const unstake: WriteTransactionBuilder<StakingData> = async (
  provider,
  _,
  { realmContractAddress, amount }
) => {
  const realmTokenContract = await getRegionContract(provider, {
    realmContractAddress,
  })

  return realmTokenContract.populateTransaction.unstake(amount)
}
