import createDappAsyncThunk from "redux-state/asyncThunk"
import { setRegionAddresses } from "redux-state/slices/map"
import {
  getAllowance,
  getRegionTokenAddresses,
  setAllowance,
  stake,
  unstake,
} from "shared/contracts"

export const fetchRegionAddresses = createDappAsyncThunk(
  "map/fetchRegionAddresses",
  async (_, { dispatch, getState, extra: { transactionService } }) => {
    const {
      map: { regions },
    } = getState()

    const regionsMap = Object.entries(regions)
      .filter(([__, { regionContractAddress }]) => !regionContractAddress)
      .map(([id, data]) => ({ id, data }))

    const regionAddresses = await transactionService.read(
      getRegionTokenAddresses,
      {
        regions: regionsMap,
      }
    )

    if (regionAddresses !== null) {
      dispatch(setRegionAddresses(regionAddresses))
    }
  }
)

export const stakeTaho = createDappAsyncThunk(
  "map/stake",
  async (
    {
      regionContractAddress,
      amount,
    }: { regionContractAddress: string; amount: bigint },
    { extra: { transactionService } }
  ) => {
    const account = await transactionService.getSignerAddress()

    const allowanceValue = await transactionService.read(getAllowance, {
      tokenAddress: CONTRACT_Taho,
      account,
      contractAddress: regionContractAddress,
    })

    if (allowanceValue === null) {
      return null
    }

    if (allowanceValue < amount) {
      await transactionService.send(setAllowance, {
        tokenAddress: CONTRACT_Taho,
        account,
        amount,
      })
    }

    return transactionService.send(stake, {
      regionContractAddress,
      amount,
    })
  }
)

export const unstakeTaho = createDappAsyncThunk(
  "map/unstake",
  async (
    {
      regionContractAddress,
      amount,
    }: { regionContractAddress: string; amount: bigint },
    { extra: { transactionService } }
  ) => {
    const account = await transactionService.getSignerAddress()

    const allowanceValue = await transactionService.read(getAllowance, {
      tokenAddress: CONTRACT_Taho,
      account,
      contractAddress: regionContractAddress,
    })

    if (allowanceValue === null) {
      return null
    }

    if (allowanceValue < amount) {
      await transactionService.send(setAllowance, {
        tokenAddress: CONTRACT_Taho,
        account,
        amount,
      })
    }

    return transactionService.send(unstake, {
      regionContractAddress,
      amount,
    })
  }
)
