import { createSlice } from "@reduxjs/toolkit"
import portrait from "shared/assets/portrait.png"
import { ETH_ADDRESS, TAHO_ADDRESS } from "shared/constants"
import { TokenBalances } from "shared/types"

export type WalletState = {
  isConnected: boolean
  address: string
  name: string
  avatar: string
  balances: TokenBalances
  isOnboarded: boolean
}

const initialState: WalletState = {
  isConnected: false,
  address: "",
  name: "",
  avatar: portrait,
  balances: {
    [TAHO_ADDRESS]: {
      symbol: "TAHO",
      balance: 0n,
    },
    [ETH_ADDRESS]: {
      symbol: "ETH",
      balance: 0n,
    },
  },
  isOnboarded: false,
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
      { payload: balances }: { payload: TokenBalances }
    ) => {
      immerState.balances = {
        ...immerState.balances,
        ...balances,
      }
    },
    updateWalletOnboarding: (immerState, { payload }: { payload: boolean }) => {
      immerState.isOnboarded = payload
    },
    resetBalances: (immerState) => {
      immerState.balances = initialState.balances
    },
  },
})

export const {
  updateConnectedWallet,
  updateDisconnectedWallet,
  updateBalances,
  updateWalletOnboarding,
  resetBalances,
} = walletSlice.actions

export default walletSlice.reducer
