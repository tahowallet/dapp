import { createSlice } from "@reduxjs/toolkit"
import portrait from "shared/assets/portrait.png"

export type WalletState = {
  isConnected: boolean
  address: string
  name: string
  avatar: string
  balance: {
    taho: bigint
    eth: bigint
  }
}

const initialState: WalletState = {
  isConnected: false,
  address: "",
  name: "",
  avatar: portrait,
  balance: {
    taho: 0n,
    eth: 0n,
  },
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
    updateBalances: (
      immerState,
      { payload: balances }: { payload: { taho?: bigint; eth?: bigint } }
    ) => {
      immerState.balance = {
        ...immerState.balance,
        ...balances,
      }
    },
  },
})

export const {
  updateConnectedWallet,
  updateDisconnectedWallet,
  updateBalances,
} = walletSlice.actions

export default walletSlice.reducer
