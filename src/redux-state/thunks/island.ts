import createDappAsyncThunk from "redux-state/asyncThunk"
import {
  setLeaderboardData,
  setUnclaimedXpData,
  setRealmPopulation,
  setRealmXpAllocatable,
  setRealmsData,
  setSeasonInfo,
} from "redux-state/slices/island"
import {
  REALMS_WITH_CONTRACT_NAME,
  TAHO_ADDRESS,
  getQuestlineData,
} from "shared/constants"
import {
  getAllRealmsData,
  getAllowance,
  getSeasonInfo,
  setAllowance,
  stake,
  unstake,
  getUnclaimedXpDistributions,
  claimXp as claimXpTokens,
  getPopulations,
} from "shared/contracts"
import { TransactionProgressStatus } from "shared/types"
import { updateTransactionStatus } from "redux-state/slices/wallet"
import { getAllowanceTransactionID } from "shared/utils"
import {
  getRealmLeaderboardData,
  getRealmXpSorted,
  getUserLeaderboardRank,
  getUserXpByMerkleRoot,
} from "shared/utils/xp"
import { getXpAllocatable } from "shared/contracts/xp"
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
          const questlineData = getQuestlineData(id)
          return {
            id,
            data: {
              ...questlineData,
              ...data,
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

export const initSeasonInfoData = createDappAsyncThunk(
  "island/initSeasonInfoData",
  async (_, { dispatch, extra: { transactionService } }) => {
    const seasonInfo = await transactionService.read(getSeasonInfo, null)

    if (seasonInfo) {
      dispatch(setSeasonInfo(seasonInfo))
    }

    return !!seasonInfo
  }
)

export const fetchPopulation = createDappAsyncThunk(
  "island/fetchPopulation",
  async (_, { getState, dispatch, extra: { transactionService } }) => {
    const {
      island: { realms },
    } = getState()
    const realmsWithAddress = Object.entries(realms).map(
      ([id, { realmContractAddress }]) => ({ id, realmContractAddress })
    )
    const result = await transactionService.read(getPopulations, {
      realmsWithAddress,
    })

    if (result) {
      result.forEach((data) => dispatch(setRealmPopulation(data)))
    }

    return !!result
  }
)

export const fetchXpAllocatable = createDappAsyncThunk(
  "island/fetchXpAllocatable",
  async (_, { getState, dispatch, extra: { transactionService } }) => {
    const {
      island: { realms },
    } = getState()

    const result = await Promise.all(
      Object.entries(realms).map(
        async ([
          id,
          {
            xpToken: { contractAddress },
          },
        ]) => {
          const xpAllocatable =
            (await transactionService.read(getXpAllocatable, {
              xpContractAddress: contractAddress,
            })) ?? 0n

          return {
            id,
            xpAllocatable,
          }
        }
      )
    )

    if (result) {
      result.forEach((data) => dispatch(setRealmXpAllocatable(data)))
    }
    return !!result
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

export const fetchLeaderboardData = createDappAsyncThunk(
  "island/fetchLeaderboardData",
  async (_, { dispatch, getState }) => {
    const {
      island: { realms },
      wallet: { address },
    } = getState()

    await Promise.allSettled(
      Object.keys(realms).map(async (realmId) => {
        const xpData = await getRealmLeaderboardData(realmId)

        if (xpData) {
          const sorted = getRealmXpSorted(xpData)
          const leaderboard = sorted.slice(0, 10).map((item, index) => ({
            ...item,
            rank: index + 1,
          }))

          const currentUser = getUserLeaderboardRank(sorted, address)

          dispatch(
            setLeaderboardData({
              id: realmId,
              data: { currentUser, leaderboard },
            })
          )
        }
      })
    )

    return true
  }
)

export const fetchUnclaimedXp = createDappAsyncThunk(
  "island/fetchUnclaimedXp",
  async (_, { getState, dispatch, extra: { transactionService } }) => {
    const account = await transactionService.getSignerAddress()
    const {
      island: { realms },
    } = getState()

    if (!account) return false

    await Promise.allSettled(
      Object.entries(realms).map(
        async ([realmId, { realmContractAddress, xpToken }]) => {
          const claims = await getUserXpByMerkleRoot(realmId, account)
          const unclaimedXp = await transactionService.read(
            getUnclaimedXpDistributions,
            {
              realmAddress: realmContractAddress,
              xpAddress: xpToken.contractAddress,
              claims,
            }
          )

          if (unclaimedXp) {
            dispatch(
              setUnclaimedXpData({
                id: realmId,
                data: unclaimedXp,
              })
            )
          }
        }
      )
    )

    return true
  }
)

export const claimXp = createDappAsyncThunk(
  "island/claimXp",
  async (
    {
      id,
      realmId,
    }: {
      id: string
      realmId: string
    },
    { dispatch, getState, extra: { transactionService } }
  ) => {
    const {
      island: { unclaimedXp },
    } = getState()
    const claims = unclaimedXp[realmId] ?? []

    if (!claims.length) {
      return false
    }

    await Promise.allSettled(
      claims.map(async ({ distributorContractAddress, claim }) => {
        await transactionService.send(id, claimXpTokens, {
          distributorContractAddress,
          claim,
        })
      })
    )

    dispatch(fetchUnclaimedXp())

    return true
  }
)
