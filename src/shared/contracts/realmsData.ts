import {
  ReadTransactionBuilder,
  RealmAddressesData,
  RealmContractData,
  RealmContractDataWithId,
} from "shared/types"
import { normalizeAddress } from "shared/utils"
import { getXpDetails } from "./xp"
import { getRealmContract, getRealmTokenAddresses } from "./realms"

export const getRealmData: ReadTransactionBuilder<
  {
    realmsWithContractData: {
      id: string
      data: RealmAddressesData
    }[]
  },
  { id: string; data: RealmAddressesData & RealmContractData }[]
> = async (provider, { realmsWithContractData }) => {
  const realmData = await Promise.all(
    realmsWithContractData.map(async ({ id, data }) => {
      const realmContract = await getRealmContract(provider, {
        realmContractAddress: data.realmContractAddress,
      })

      const name: string = await realmContract.name()
      const questlineUrl: string = await realmContract.questlineUrl()
      const xpTokenContractAddress: string = normalizeAddress(
        await realmContract.xp()
      )
      const xpTokenDetails = await getXpDetails(provider, {
        xpContractAddress: xpTokenContractAddress,
      })

      return {
        id,
        data: {
          ...data,
          name,
          xpToken: {
            ...xpTokenDetails,
            contractAddress: xpTokenContractAddress,
          },
          questlineUrl,
          // Population is fetched separately because it should be updated more frequently than other data for the realm.
          population: 0,
          displayedPopulation: 0,
          // XpAllocatable is fetched after all Realm data is initialized.
          xpAllocatable: "0",
        },
      }
    })
  )
  return realmData
}

export const getAllRealmsData: ReadTransactionBuilder<
  { realms: { [id: string]: { address: string } } },
  RealmContractDataWithId[]
> = async (provider, { realms }) => {
  const realmsWithContractData = await getRealmTokenAddresses(provider, {
    realms,
  })

  const realmData = await getRealmData(provider, { realmsWithContractData })

  return realmData
}

export const getPopulations: ReadTransactionBuilder<
  {
    realmsWithAddress: {
      id: string
      realmContractAddress: string
    }[]
  },
  { id: string; population: number }[]
> = async (provider, { realmsWithAddress }) => {
  const populations = await Promise.all(
    realmsWithAddress.map(async ({ id, realmContractAddress }) => {
      const realmContract = await getRealmContract(provider, {
        realmContractAddress,
      })
      const population = await realmContract.population()

      return {
        id,
        population: population.toNumber(),
      }
    })
  )

  return populations
}
