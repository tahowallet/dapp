import {
  determineFetchedFileType,
  isClaimXpTransactionID,
  resolveAddressToWalletData,
} from "shared/utils"
import {
  updateBalances,
  updateConnectedWallet,
  resetWalletState,
  stopTrackingTransactionStatus,
} from "redux-state/slices/wallet"
import { resetClaiming, setClaimingUser } from "redux-state/slices/claim"
import { getBalance, getStakeUnlockTime } from "shared/contracts"
import { ethers } from "ethers"
import { ETH_ADDRESS, SECOND, TAHO_ADDRESS } from "shared/constants"
import { TokenBalances } from "shared/types"
import {
  resetIslandAccount,
  resetIslandDisplay,
  setStakingRealmId,
  setStakingUnlockTime,
} from "redux-state/slices/island"
import createDappAsyncThunk from "../asyncThunk"

export const fetchWalletName = createDappAsyncThunk(
  "wallet/fetchWalletName",
  async ({ address }: { address: string }, { dispatch, getState }) => {
    const {
      claim: { useConnectedWallet },
    } = getState()

    const data = await resolveAddressToWalletData(address)

    if (data) {
      dispatch(
        updateConnectedWallet({
          address,
          ...(data.name ? { name: data.name } : {}),
          ...(data.avatar ? { avatar: data.avatar } : {}),
          avatarType: data.avatar
            ? await determineFetchedFileType(data.avatar)
            : null,
        })
      )

      if (useConnectedWallet) {
        dispatch(setClaimingUser({ name: data.name, address }))
      }
    }

    return data?.name
  }
)

export const connectArbitrumProvider = createDappAsyncThunk(
  "wallet/connectArbitrumProvider",
  async (
    {
      arbitrumProvider,
    }: {
      arbitrumProvider: ethers.providers.JsonRpcBatchProvider
    },
    { extra: { transactionService } }
  ) => {
    await transactionService.setArbitrumProvider(arbitrumProvider)
  }
)

export const connectArbitrumProviderFallback = createDappAsyncThunk(
  "wallet/connectArbitrumProviderFallback",
  async (
    {
      arbitrumProviderFallback,
    }: {
      arbitrumProviderFallback: ethers.providers.JsonRpcBatchProvider
    },
    { extra: { transactionService } }
  ) => {
    await transactionService.setArbitrumProviderFallback(
      arbitrumProviderFallback
    )
  }
)

export const prepareForWalletChange = createDappAsyncThunk(
  "wallet/prepareForWalletChange",
  async (_, { dispatch }) => {
    // reseting whole thing, with balances
    dispatch(resetWalletState())
    dispatch(resetIslandDisplay())
    dispatch(resetIslandAccount())
    dispatch(resetClaiming())
  }
)

export const connectWalletGlobally = createDappAsyncThunk(
  "wallet/connectWalletGlobally",
  async (
    {
      address,
      avatar,
      arbitrumSigner,
    }: {
      address: string
      avatar?: string
      arbitrumSigner: ethers.providers.JsonRpcSigner
    },
    { dispatch, getState, extra: { transactionService } }
  ) => {
    const {
      claim: { useConnectedWallet },
    } = getState()

    await transactionService.setArbitrumSigner(arbitrumSigner)

    dispatch(prepareForWalletChange())

    dispatch(
      updateConnectedWallet({
        address,
        avatar,
      })
    )
    await dispatch(fetchWalletName({ address }))

    if (useConnectedWallet) {
      dispatch(setClaimingUser({ address }))
    }
  }
)

export const disconnectWalletGlobally = createDappAsyncThunk(
  "wallet/disconnectWalletGlobally",
  async (_, { dispatch, extra: { transactionService } }) => {
    await transactionService.setArbitrumSigner(null)

    dispatch(prepareForWalletChange())

    // TODO: stale, fix it once we are back to claiming
    // if (useConnectedWallet) {
    //   dispatch(resetClaiming())
    // }
  }
)

export const fetchWalletBalances = createDappAsyncThunk(
  "wallet/fetchWalletBalance",
  async (_, { getState, dispatch, extra: { transactionService } }) => {
    const account = await transactionService.getSignerAddress()
    const {
      island: { realms },
    } = getState()

    if (!account) return null

    let stakingRealmId = null
    let stakingRealmContractAddress = null

    const tahoBalance =
      (await transactionService.read(getBalance, {
        tokenAddress: TAHO_ADDRESS,
        account,
      })) ?? 0n

    const veTahoBalances = await Promise.all(
      Object.entries(realms).flatMap(
        async ([realmId, { realmContractAddress, veTokenContractAddress }]) => {
          if (!veTokenContractAddress) return []

          const veTahoBalance =
            (await transactionService.read(getBalance, {
              tokenAddress: veTokenContractAddress,
              account,
            })) ?? 0n

          if (veTahoBalance > 0n) {
            stakingRealmId = realmId
            stakingRealmContractAddress = realmContractAddress
          }

          return [
            veTokenContractAddress,
            { symbol: "TAHO", balance: veTahoBalance }, // displayed symbol for veTAHO is just TAHO
          ]
        }
      )
    )

    const ethBalance = await transactionService.getEthBalance()

    const balances: TokenBalances = {
      [TAHO_ADDRESS]: { symbol: "TAHO", balance: tahoBalance },
      [ETH_ADDRESS]: { symbol: "ETH", balance: ethBalance },
      ...Object.fromEntries(veTahoBalances),
    }

    dispatch(updateBalances(balances))
    dispatch(setStakingRealmId(stakingRealmId))

    if (stakingRealmContractAddress) {
      const unlockTime = await transactionService.read(getStakeUnlockTime, {
        realmContractAddress: stakingRealmContractAddress,
        account,
      })

      const unlockTimeInMilliseconds = unlockTime
        ? Number(unlockTime) * SECOND
        : null

      dispatch(setStakingUnlockTime(unlockTimeInMilliseconds))
    } else {
      dispatch(setStakingUnlockTime(null))
    }

    return balances
  }
)

export const stopTrackingClaimTransactions = createDappAsyncThunk(
  "wallet/stopTrackingClaimTransactions",
  async (_, { getState, dispatch }) => {
    const {
      wallet: { transactionStatus },
    } = getState()

    const claimTransactionIds = Object.keys(transactionStatus).filter(
      isClaimXpTransactionID
    )

    claimTransactionIds.forEach((id) => {
      dispatch(stopTrackingTransactionStatus(id))
    })
  }
)
