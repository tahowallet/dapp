import createDappAsyncThunk from "redux-state/asyncThunk"
import { setRegionAddresses } from "redux-state/slices/map"
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
  "map/fetchRegionAddresses",
  async (_, { dispatch, getState, extra: { transactionService } }) => {
    const {
      map: { regions },
    } = getState()

    const regionsWithoutAddresses = Object.entries(regions).reduce<
      RegionContractDataWithId[]
    >((acc, [id, data]) => {
      if (data.regionContractAddress === null) {
        acc.push({ id, data })
      }
      return acc
    }, [])

    const regionAddresses = await transactionService.read(
      getRegionTokenAddresses,
      {
        regions: regionsWithoutAddresses,
      }
    )

    if (regionAddresses !== null) {
      dispatch(setRegionAddresses(regionAddresses))
    }
  }
)

export const ensureAllowance = createDappAsyncThunk(
  "map/ensureAllowance",
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
  "map/stake",
  async (
    {
      regionContractAddress,
      amount,
    }: { regionContractAddress: string; amount: bigint },
    { dispatch, extra: { transactionService } }
  ) => {
    const allowanceCorrect = await dispatch(
      ensureAllowance({
        tokenAddress: TAHO_ADDRESS,
        contractAddress: regionContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return null
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
    { dispatch, extra: { transactionService } }
  ) => {
    const veTokenAddress = await transactionService.read(
      getRegionVeTokenAddress,
      {
        regionContractAddress,
      }
    )

    if (!veTokenAddress) {
      return null
    }

    const allowanceCorrect = await dispatch(
      ensureAllowance({
        tokenAddress: veTokenAddress,
        contractAddress: regionContractAddress,
        amount,
      })
    )

    if (!allowanceCorrect) {
      return null
    }

    return transactionService.send(unstake, {
      regionContractAddress,
      amount,
    })
  }
)
