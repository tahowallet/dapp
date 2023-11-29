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
  avatarType: string | null
  hasLoadedBalances: boolean
  balances: TokenBalances
  transactionStatus: { [id: string]: TransactionProgressStatus }
}

const initialState: WalletState = {
  isConnected: false,
  address: "",
  name: "",
  avatar: portrait,
  avatarType: null,
  hasLoadedBalances: false,
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
      }: {
        payload: {
          address: string
          name?: string
          avatar?: string
          avatarType?: string | null
        }
      }
    ) => {
      immerState.isConnected = true
      immerState.address = payload.address || immerState.address
      immerState.name = payload.name || immerState.name || ""
      immerState.avatar = payload.avatar || immerState.avatar || portrait
      immerState.avatarType = payload.avatarType || null
    },
    resetWalletState: () => initialState,
    updateBalances: (
      immerState,
      { payload: balances }: { payload: TokenBalances }
    ) => {
      immerState.balances = {
        ...immerState.balances,
        ...balances,
      }
      // First we are getting balances of ETH and TAHO, then veTAHO - to consider
      // balances as fully loaded we need to know veTAHO as well
      immerState.hasLoadedBalances = Object.keys(immerState.balances).length > 2
    },
    resetBalances: (immerState) => {
      immerState.balances = initialState.balances
      immerState.hasLoadedBalances = false
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
  resetWalletState,
  updateBalances,
  resetBalances,
  updateTransactionStatus,
  stopTrackingTransactionStatus,
} = walletSlice.actions

export default walletSlice.reducer
