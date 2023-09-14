import { resolveAddressToName } from "shared/utils"
import {
  updateBalances,
  updateConnectedWallet,
  updateDisconnectedWallet,
} from "redux-state/slices/wallet"
import { resetClaiming, setClaimingUser } from "redux-state/slices/claim"
import { getBalance } from "shared/contracts"
import { ethers } from "ethers"
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

export const fetchWalletBalance = createDappAsyncThunk(
  "wallet/fetchWalletBalance",
  async (_, { dispatch, extra: { transactionService } }) => {
    const account = await transactionService.getSignerAddress()

    const taho = await transactionService.read(getBalance, {
      tokenAddress: CONTRACT_Taho,
      account,
    })

    const eth = await transactionService.getEthBalance()

    dispatch(updateBalances({ taho, eth }))
  }
)
