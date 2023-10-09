import createDappAsyncThunk from "redux-state/asyncThunk"
import {
  setLeaderboardData,
  setUnclaimedXpData,
  setRealmPopulation,
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
  getStakersRegistered,
  getStakersUnregistered,
  setAllowance,
  stake,
  unstake,
  getUnclaimedXpDistributions,
  claimXp as claimXpTokens,
} from "shared/contracts"
import { selectRealmWithIdByAddress } from "redux-state/selectors/island"
import { TransactionProgressStatus } from "shared/types"
import { updateTransactionStatus } from "redux-state/slices/wallet"
import { getAllowanceTransactionID } from "shared/utils"
import {
  getRealmLeaderboardData,
  getRealmXpSorted,
  getUserLeaderboardRank,
  getUserXpByMerkleRoot,
} from "shared/utils/xp"
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
          const questlineData = getQuestlineData(data.realmContractAddress)
          return {
            id,
            data: {
              ...questlineData,
              ...data,
              // TODO: The name of the realm should be taken from the contracts.
              // At the moment, these aren't available. Let's use mocked data for this moment.
              name: data.name || REALMS_WITH_CONTRACT_NAME[id].realmName,
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
        async ([realmId, { realmContractAddress }]) => {
          const claims = await getUserXpByMerkleRoot(realmId, account)
          const unclaimedXp = await transactionService.read(
            getUnclaimedXpDistributions,
            {
              realmAddress: realmContractAddress,
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
