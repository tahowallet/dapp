import createDappAsyncThunk from "redux-state/asyncThunk"
import {
  setAssistant,
  setRealmPopulation,
  setRealmsData,
} from "redux-state/slices/island"
import {
  REALMS_WITH_CONTRACT_NAME,
  TAHO_ADDRESS,
  getRealmCustomData,
} from "shared/constants"
import {
  getAllRealmsData,
  getAllowance,
  getStakersRegistered,
  getStakersUnregistered,
  setAllowance,
  stake,
  unstake,
} from "shared/contracts"
import { selectRealmWithIdByAddress } from "redux-state/selectors/island"
import { TransactionProgressStatus } from "shared/types"
import { updateTransactionStatus } from "redux-state/slices/wallet"
import { getAllowanceTransactionID } from "shared/utils"
import { fetchWalletBalances } from "./wallet"

export const initRealmsDataFromContracts = createDappAsyncThunk(
  "island/initRealmsDataFromContracts",
  async (_, { dispatch, getState, extra: { transactionService } }) => {
    const {
      island: { realms },
    } = getState()

    // Run when data isn't set
    if (Object.keys(realms).length === 0) {
      const realmData = await transactionService.read(getAllRealmsData, {
        realms: REALMS_WITH_CONTRACT_NAME,
      })

      if (realmData !== null) {
        const updatedRealms = realmData.map(({ id, data }) => {
          const customData = getRealmCustomData(id)
          return {
            id,
            data: {
              ...customData,
              ...data,
              // TODO: The name of the realm should be taken from the contracts.
              // At the moment, these aren't available. So let's use the ones stored in the JSON file.
              name: data.name || customData.name,
            },
          }
        })
        dispatch(setRealmsData(updatedRealms))
      }

      return !!realmData
    }

    return false
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
      mappedRealms[realmContractAddress] = 0
    })

    registeredStakers?.forEach(([realm]) => {
      if (mappedRealms[realm] !== undefined) {
        mappedRealms[realm] += 1
      }
    })

    unregisteredStakers?.forEach(([realm]) => {
      if (mappedRealms[realm] !== undefined) {
        mappedRealms[realm] -= 1
      }
    })

    Object.entries(mappedRealms).forEach(([realmAddress, population]) => {
      const [realmId] = selectRealmWithIdByAddress(
        getState(),
        realmAddress
      ) ?? [null]

      if (realmId !== null) {
        dispatch(setRealmPopulation({ id: realmId, population }))
      }
    })
  }
)

export const ensureAllowance = createDappAsyncThunk(
  "island/ensureAllowance",
  async (
    {
      id,
      tokenAddress,
      spender,
      amount,
    }: { id: string; tokenAddress: string; spender: string; amount: bigint },
    { extra: { transactionService }, dispatch }
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
      // Update on "parent transaction" to make it possible to track them together in the UI
      dispatch(
        updateTransactionStatus({
          id,
          status: TransactionProgressStatus.Approving,
        })
      )

      const receipt = await transactionService.send(
        getAllowanceTransactionID(id),
        setAllowance,
        {
          tokenAddress,
          spender,
          amount,
        }
      )

      return !!receipt
    }

    return true
  }
)

export const stakeTaho = createDappAsyncThunk(
  "island/stake",
  async (
    {
      id,
      realmContractAddress,
      amount,
    }: { id: string; realmContractAddress: string; amount: bigint },
    { dispatch, extra: { transactionService } }
  ) => {
    const allowanceCorrect = await dispatch(
      ensureAllowance({
        id,
        tokenAddress: TAHO_ADDRESS,
        spender: realmContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return false
    }

    const receipt = await transactionService.send(id, stake, {
      realmContractAddress,
      amount,
    })

    if (receipt) {
      dispatch(fetchWalletBalances())
      dispatch(fetchPopulation())
      dispatch(setAssistant("join-region"))
    }

    return !!receipt
  }
)

export const unstakeTaho = createDappAsyncThunk(
  "island/unstake",
  async (
    {
      id,
      realmContractAddress,
      veTokenContractAddress,
      amount,
    }: {
      id: string
      realmContractAddress: string
      veTokenContractAddress: string
      amount: bigint
    },
    { dispatch, extra: { transactionService } }
  ) => {
    const allowanceCorrect = await dispatch(
      ensureAllowance({
        id,
        tokenAddress: veTokenContractAddress,
        spender: realmContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return false
    }

    const receipt = await transactionService.send(id, unstake, {
      realmContractAddress,
      amount,
    })

    if (receipt) {
      dispatch(fetchWalletBalances())
      dispatch(fetchPopulation())
    }

    return !!receipt
  }
)
