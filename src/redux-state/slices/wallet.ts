import { createSlice } from "@reduxjs/toolkit"
import portrait from "shared/assets/portrait.png"

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
    updateConnectedWallet: (
      immerState,
      {
        payload,
      }: { payload: { address: string; name?: string; avatar?: string } }
    ) => {
      immerState.isConnected = true
      immerState.address = payload.address || immerState.address
      immerState.name = payload.name || immerState.name || ""
      immerState.avatar = payload.avatar || immerState.avatar || portrait
    },
    updateDisconnectedWallet: (_) => initialState,
  },
})

export const { updateConnectedWallet, updateDisconnectedWallet } =
  walletSlice.actions

export default walletSlice.reducer
