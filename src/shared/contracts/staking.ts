import {
  ReadTransactionBuilder,
  StakingData,
  WriteTransactionBuilder,
  RealmWithStaker,
} from "shared/types"
import { normalizeAddress } from "shared/utils"
import { ethers } from "ethers"
import { CONTRACT_DEPLOYMENT_BLOCK_NUMBER } from "shared/constants"
import { getRealmContract } from "./realms"
import { getGameContract } from "./game"

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

const getStakersFromEvents = (events: ethers.Event[]) =>
  events.flatMap<RealmWithStaker>((event) => {
    const { args } = event

    return args
      ? [[normalizeAddress(args.realm), normalizeAddress(args.staker)]]
      : []
  })

export const getStakersRegistered: ReadTransactionBuilder<
  null,
  RealmWithStaker[]
> = async (provider) => {
  const gameContract = await getGameContract(provider, null)

  const stakerRegisteredEventFilter = gameContract.filters.StakerRegistered()
  const stakerRegisteredEvents = await gameContract.queryFilter(
    stakerRegisteredEventFilter,
    CONTRACT_DEPLOYMENT_BLOCK_NUMBER
  )

  const registeredStakers = getStakersFromEvents(stakerRegisteredEvents)
  return registeredStakers
}

export const getStakersUnregistered: ReadTransactionBuilder<
  null,
  RealmWithStaker[]
> = async (provider) => {
  const gameContract = await getGameContract(provider, null)

  const stakerUnregisteredEventFilter =
    gameContract.filters.StakerUnregistered()
  const stakerUnregisteredEvents = await gameContract.queryFilter(
    stakerUnregisteredEventFilter,
    CONTRACT_DEPLOYMENT_BLOCK_NUMBER
  )

  const unregisteredStakers = getStakersFromEvents(stakerUnregisteredEvents)

  return unregisteredStakers
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
