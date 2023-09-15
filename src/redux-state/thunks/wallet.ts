import { resolveAddressToName } from "shared/utils"
import {
  updateConnectedWallet,
  updateDisconnectedWallet,
} from "redux-state/slices/wallet"
import { resetClaiming, setClaimingUser } from "redux-state/slices/claim"
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
    { address, avatar }: { address: string; avatar?: string },
    { dispatch, getState }
  ) => {
    const {
      claim: { useConnectedWallet },
    } = getState()

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
