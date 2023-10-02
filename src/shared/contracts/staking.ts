import {
  ReadTransactionBuilder,
  StakingData,
  WriteTransactionBuilder,
} from "shared/types"
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

export const getStakeUnlockTime: ReadTransactionBuilder<
  { realmContractAddress: string; account: string },
  bigint
> = async (provider, { realmContractAddress, account }) => {
  const realmContract = await getRealmContract(provider, {
    realmContractAddress,
  })

  const unlockTime = await realmContract.stakeUnlockTime(account)

  return BigInt(unlockTime)
}
