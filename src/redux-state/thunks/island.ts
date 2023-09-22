import createDappAsyncThunk from "redux-state/asyncThunk"
import { setRegionAddresses } from "redux-state/slices/island"
import { TAHO_ADDRESS } from "shared/constants"
import {
  getAllowance,
  getRegionTokenAddresses,
  getRegionVeTokenAddress,
  setAllowance,
  stake,
  unstake,
} from "shared/contracts"
import { RegionContractDataWithId } from "shared/types"

export const fetchRegionAddresses = createDappAsyncThunk(
  "island/fetchRegionAddresses",
  async (_, { dispatch, getState, extra: { transactionService } }) => {
    const {
      island: { realms },
    } = getState()

    const realmsWithoutAddresses = Object.entries(realms).reduce<
      RegionContractDataWithId[]
    >((acc, [id, data]) => {
      if (data.realmContractAddress === null) {
        acc.push({ id, data })
      }
      return acc
    }, [])

    const realmAddresses = await transactionService.read(
      getRegionTokenAddresses,
      {
        realms: realmsWithoutAddresses,
      }
    )

    if (realmAddresses !== null) {
      dispatch(setRegionAddresses(realmAddresses))
    }
  }
)

export const ensureAllowance = createDappAsyncThunk(
  "island/ensureAllowance",
  async (
    {
      tokenAddress,
      contractAddress,
      amount,
    }: { tokenAddress: string; contractAddress: string; amount: bigint },
    { extra: { transactionService } }
  ) => {
    const account = await transactionService.getSignerAddress()

    const allowanceValue = await transactionService.read(getAllowance, {
      tokenAddress,
      account,
      contractAddress,
    })

    if (allowanceValue === null) {
      return false
    }

    if (allowanceValue < amount) {
      const receipt = await transactionService.send(setAllowance, {
        tokenAddress,
        account,
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
        contractAddress: realmContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return null
    }

    return transactionService.send(stake, {
      realmContractAddress,
      amount,
    })
  }
)

export const unstakeTaho = createDappAsyncThunk(
  "island/unstake",
  async (
    {
      realmContractAddress,
      amount,
    }: { realmContractAddress: string; amount: bigint },
    { dispatch, extra: { transactionService } }
  ) => {
    const veTokenAddress = await transactionService.read(
      getRegionVeTokenAddress,
      {
        realmContractAddress,
      }
    )

    if (!veTokenAddress) {
      return null
    }

    const allowanceCorrect = await dispatch(
      ensureAllowance({
        tokenAddress: veTokenAddress,
        contractAddress: realmContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return null
    }

    return transactionService.send(unstake, {
      realmContractAddress,
      amount,
    })
  }
)
