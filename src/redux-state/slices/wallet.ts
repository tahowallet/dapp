import { createSlice } from "@reduxjs/toolkit"
import portrait from "shared/assets/portrait.png"
import { ETH_ADDRESS, TAHO_ADDRESS } from "shared/constants"
import { TokenBalances, TransactionProgressStatus } from "shared/types"
import { getAllowanceTransactionID } from "shared/utils"

export type WalletState = {
  isConnected: boolean
  address: string
  name: string
  avatar: string
  balances: TokenBalances
  transactionStatus: { [id: string]: TransactionProgressStatus }
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
  transactionStatus: {},
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
    updateDisconnectedWallet: () => initialState,
    updateBalances: (
      immerState,
      { payload: balances }: { payload: TokenBalances }
    ) => {
      immerState.balances = {
        ...immerState.balances,
        ...balances,
      }
    },
    resetBalances: (immerState) => {
      immerState.balances = initialState.balances
    },
    updateTransactionStatus: (
      immerState,
      {
        payload,
      }: {
        payload: { id: string; status: TransactionProgressStatus }
      }
    ) => {
      immerState.transactionStatus[payload.id] = payload.status
    },
    stopTrackingTransactionStatus: (
      immerState,
      { payload: id }: { payload: string }
    ) => {
      delete immerState.transactionStatus[id]
      delete immerState.transactionStatus[getAllowanceTransactionID(id)]
    },
  },
})

export const {
  updateConnectedWallet,
  updateDisconnectedWallet,
  updateBalances,
  resetBalances,
  updateTransactionStatus,
  stopTrackingTransactionStatus,
} = walletSlice.actions

export default walletSlice.reducer
