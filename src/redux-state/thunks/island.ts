import createDappAsyncThunk from "redux-state/asyncThunk"
import {
  setRealmContractData,
  setRealmPopulation,
} from "redux-state/slices/island"
import { TAHO_ADDRESS } from "shared/constants"
import {
  getAllowance,
  getRealmTokenAddresses,
  getStakersRegistered,
  getStakersUnregistered,
  setAllowance,
  stake,
  unstake,
} from "shared/contracts"
import { RealmContractDataWithId } from "shared/types"
import { normalizeAddress } from "shared/utils"
import { fetchWalletBalances } from "./wallet"

export const fetchRealmAddresses = createDappAsyncThunk(
  "island/fetchRealmAddresses",
  async (_, { dispatch, getState, extra: { transactionService } }) => {
    const {
      island: { realms },
    } = getState()

    const realmsWithoutAddresses = Object.entries(realms).reduce<
      RealmContractDataWithId[]
    >((acc, [id, data]) => {
      if (data.realmContractAddress === null) {
        acc.push({ id, data })
      }
      return acc
    }, [])

    const realmAddresses = await transactionService.read(
      getRealmTokenAddresses,
      {
        realms: realmsWithoutAddresses,
      }
    )

    if (realmAddresses !== null) {
      dispatch(setRealmContractData(realmAddresses))
    }

    return realmAddresses
  }
)

export const ensureAllowance = createDappAsyncThunk(
  "island/ensureAllowance",
  async (
    {
      tokenAddress,
      spender,
      amount,
    }: { tokenAddress: string; spender: string; amount: bigint },
    { extra: { transactionService } }
  ) => {
    const account = await transactionService.getSignerAddress()

    const allowanceValue = await transactionService.read(getAllowance, {
      tokenAddress,
      account,
      spender,
    })

    if (allowanceValue === null) {
      return false
    }

    if (allowanceValue < amount) {
      const receipt = await transactionService.send(setAllowance, {
        tokenAddress,
        spender,
        amount,
      })

      return !!receipt
    }

    return true
  }
)

export const stakeTaho = createDappAsyncThunk(
  "island/stake",
  async (
    {
      realmContractAddress,
      amount,
    }: { realmContractAddress: string; amount: bigint },
    { dispatch, extra: { transactionService } }
  ) => {
    const allowanceCorrect = await dispatch(
      ensureAllowance({
        tokenAddress: TAHO_ADDRESS,
        spender: realmContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return false
    }

    const receipt = await transactionService.send(stake, {
      realmContractAddress,
      amount,
    })

    if (receipt) {
      dispatch(fetchWalletBalances())
    }

    return !!receipt
  }
)

export const unstakeTaho = createDappAsyncThunk(
  "island/unstake",
  async (
    {
      realmContractAddress,
      veTokenContractAddress,
      amount,
    }: {
      realmContractAddress: string
      veTokenContractAddress: string
      amount: bigint
    },
    { dispatch, extra: { transactionService } }
  ) => {
    const allowanceCorrect = await dispatch(
      ensureAllowance({
        tokenAddress: veTokenContractAddress,
        spender: realmContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return false
    }

    const receipt = await transactionService.send(unstake, {
      realmContractAddress,
      amount,
    })

    if (receipt) {
      dispatch(fetchWalletBalances())
    }

    return !!receipt
  }
)

export const fetchPopulation = createDappAsyncThunk(
  "island/fetchPopulation",
  async (_, { getState, dispatch, extra: { transactionService } }) => {
    const {
      island: { realms },
    } = getState()

    const registeredStakers = await transactionService.read(
      getStakersRegistered,
      null
    )
    const unregisteredStakers = await transactionService.read(
      getStakersUnregistered,
      null
    )

    const mappedRealms: { [address: string]: number } = {}

    Object.values(realms).forEach(({ realmContractAddress }) => {
      if (realmContractAddress !== null) {
        mappedRealms[normalizeAddress(realmContractAddress)] = 0
      }
    })

    registeredStakers?.forEach(([realm]) => {
      const normalizedRealm = normalizeAddress(realm)

      if (mappedRealms[normalizedRealm] !== undefined) {
        mappedRealms[normalizedRealm] += 1
      }
    })

    unregisteredStakers?.forEach(([realm]) => {
      const normalizedRealm = normalizeAddress(realm)

      if (mappedRealms[normalizedRealm] !== undefined) {
        mappedRealms[normalizedRealm] -= 1
      }
    })

    Object.entries(mappedRealms).forEach(([realmAddress, population]) => {
      const [realmId] = Object.entries(realms).find(
        ([__, { realmContractAddress }]) =>
          realmContractAddress !== null &&
          normalizeAddress(realmContractAddress) === realmAddress
      ) ?? [null]

      if (realmId !== null) {
        dispatch(setRealmPopulation({ id: realmId, population }))
      }
    })
  }
)
