import { resolveAddressToName } from "shared/utils"
import {
  updateBalances,
  updateConnectedWallet,
  updateDisconnectedWallet,
} from "redux-state/slices/wallet"
import { resetClaiming, setClaimingUser } from "redux-state/slices/claim"
import { getBalance, getStakeUnlockTime } from "shared/contracts"
import { ethers } from "ethers"
import { ETH_ADDRESS, SECOND, TAHO_ADDRESS } from "shared/constants"
import { TokenBalances } from "shared/types"
import {
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

    const resolvedName = await resolveAddressToName(address)

    if (resolvedName) {
      dispatch(
        updateConnectedWallet({
          address,
          name: resolvedName,
        })
      )

      if (useConnectedWallet) {
        dispatch(setClaimingUser({ name: resolvedName, address }))
      }
    }

    return resolvedName
  }
)

export const connectWalletGlobally = createDappAsyncThunk(
  "wallet/connectWalletGlobally",
  async (
    {
      address,
      avatar,
      arbitrumProvider,
    }: {
      address: string
      avatar?: string
      arbitrumProvider: ethers.providers.Web3Provider
    },
    { dispatch, getState, extra: { transactionService } }
  ) => {
    const {
      claim: { useConnectedWallet },
    } = getState()

    await transactionService.setArbitrumProvider(arbitrumProvider)

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
  async (_, { dispatch, getState, extra: { transactionService } }) => {
    const {
      claim: { useConnectedWallet },
    } = getState()

    await transactionService.setArbitrumProvider(null)

    dispatch(updateDisconnectedWallet())

    if (useConnectedWallet) {
      dispatch(resetClaiming())
    }
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
