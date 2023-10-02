import {
  ReadTransactionBuilder,
  StakingData,
  WriteTransactionBuilder,
} from "shared/types"
import { RealmWithStaker } from "shared/types/stake"
import { normalizeAddress } from "shared/utils"
import { ethers } from "ethers"
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
    stakerRegisteredEventFilter
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
    stakerUnregisteredEventFilter
  )

  const unregisteredStakers = getStakersFromEvents(stakerUnregisteredEvents)

  return unregisteredStakers
}
