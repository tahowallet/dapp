import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import portrait from "shared/assets/portrait.png"
import { resolveAddressToName, truncateAddress } from "shared/utils"

export type WalletState = {
  isConnected: boolean
  address: string
  name: string
  avatar: string
}

const initialState: WalletState = {
  isConnected: false,
  address: "",
  name: "",
  avatar: portrait,
}

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setConnectedWallet: (
      immerState,
      {
        payload,
      }: { payload: { address: string; name?: string; avatar?: string } }
    ) => {
      immerState.isConnected = true
      immerState.address = payload.address ?? immerState.address
      immerState.name = payload.name ?? immerState.name ?? ""
      immerState.avatar = payload.avatar ?? immerState.avatar ?? portrait
    },
    setDisconnectedWallet: (immerState) => {
      immerState.isConnected = false
      immerState.address = ""
      immerState.name = ""
      immerState.avatar = portrait
    },
  },
})

export const { setConnectedWallet, setDisconnectedWallet } = walletSlice.actions

export default walletSlice.reducer

export const selectWalletAddress = (state: { wallet: WalletState }) =>
  state.wallet.address

export const selectWalletTruncatedAddress = (state: { wallet: WalletState }) =>
  truncateAddress(state.wallet.address)

export const selectWalletName = (state: { wallet: WalletState }) =>
  state.wallet.name ?? truncateAddress(state.wallet.address)

export const selectWalletAvatar = (state: { wallet: WalletState }) =>
  state.wallet.avatar

export const selectIsWalletConnected = (state: { wallet: WalletState }) =>
  state.wallet.isConnected

export const fetchWalletName = createAsyncThunk(
  "wallet/fetchWalletName",
  async ({ address }: { address: string }, { dispatch }) => {
    const resolvedName = await resolveAddressToName(address)

    if (resolvedName) {
      dispatch(
        setConnectedWallet({
          address,
          name: resolvedName,
        })
      )
    }
  }
)
