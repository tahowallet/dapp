import createDappAsyncThunk from "redux-state/asyncThunk"
import { setRealmContractData } from "redux-state/slices/island"
import { TAHO_ADDRESS } from "shared/constants"
import {
  getAllowance,
  getRealmTokenAddresses,
  setAllowance,
  stake,
  unstake,
} from "shared/contracts"
import {
  RealmContractDataWithId,
  TransactionProgressStatus,
} from "shared/types"
import { updateTransactionStatus } from "redux-state/slices/wallet"
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
        `${id}_allowance`,
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
    }

    return !!receipt
  }
)
