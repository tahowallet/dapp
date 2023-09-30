import {
  ReadTransactionBuilder,
  StakingData,
  WriteTransactionBuilder,
} from "shared/types"
import { RealmWithStaker } from "shared/types/stake"
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

export const getStakersRegistered: ReadTransactionBuilder<
  null,
  RealmWithStaker[]
> = async (provider) => {
  const gameContract = await getGameContract(provider, null)

  const stakerRegisteredEventFilter = gameContract.filters.StakerRegistered()
  const stakerRegisteredEvents = await gameContract.queryFilter(
    stakerRegisteredEventFilter
  )

  const registeredStakers = stakerRegisteredEvents.flatMap<RealmWithStaker>(
    (event) => {
      const { args } = event

      return args ? [[args.realm, args.staker]] : []
    }
  )

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

  const unregisteredStakers = stakerUnregisteredEvents.flatMap<RealmWithStaker>(
    (event) => {
      const { args } = event

      return args ? [[args.realm, args.staker]] : []
    }
  )

  return unregisteredStakers
}
