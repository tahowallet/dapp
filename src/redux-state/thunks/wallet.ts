import { resolveAddressToName } from "shared/utils"
import {
  updateBalances,
  updateConnectedWallet,
  updateDisconnectedWallet,
} from "redux-state/slices/wallet"
import { resetClaiming, setClaimingUser } from "redux-state/slices/claim"
import { getBalance } from "shared/contracts"
import { ethers } from "ethers"
import { ETH_ADDRESS, TAHO_ADDRESS } from "shared/constants"
import { TokenBalances } from "shared/types"
import { setStakingRegionId } from "redux-state/slices/map"
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
      map: { regions },
    } = getState()

    if (!account) return null

    let stakingRegionId = null

    const tahoBalance =
      (await transactionService.read(getBalance, {
        tokenAddress: TAHO_ADDRESS,
        account,
      })) ?? 0n

    const veTahoBalances = await Promise.all(
      Object.entries(regions).flatMap(
        async ([regionId, { veTokenContractAddress }]) => {
          if (!veTokenContractAddress) return []

          const veTahoBalance =
            (await transactionService.read(getBalance, {
              tokenAddress: veTokenContractAddress,
              account,
            })) ?? 0n

          if (veTahoBalance > 0n) {
            stakingRegionId = regionId
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
    dispatch(setStakingRegionId(stakingRegionId))

    return balances
  }
)
