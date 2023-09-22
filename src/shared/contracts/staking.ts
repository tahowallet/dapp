import { StakingData, WriteTransactionBuilder } from "shared/types"
import { getRealmContract } from "./realms"

export const stake: WriteTransactionBuilder<StakingData> = async (
  provider,
  _,
  { realmContractAddress, amount }
) => {
  const realmTokenContract = await getRealmContract(provider, {
    realmContractAddress,
  })

  return realmTokenContract.populateTransaction.stake(amount)
}

export const unstake: WriteTransactionBuilder<StakingData> = async (
  provider,
  _,
  { realmContractAddress, amount }
) => {
  const realmTokenContract = await getRealmContract(provider, {
    realmContractAddress,
  })

  return realmTokenContract.populateTransaction.unstake(amount)
}
