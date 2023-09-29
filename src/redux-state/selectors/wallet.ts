import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"
import { TransactionProgressStatus } from "shared/types"
import { truncateAddress } from "shared/utils"

export const selectWalletAddress = (state: RootState) => state.wallet.address

export const selectWalletTruncatedAddress = (state: RootState) =>
  truncateAddress(state.wallet.address)

export const selectWalletName = (state: RootState) =>
  state.wallet.name || truncateAddress(state.wallet.address)

export const selectWalletAvatar = (state: RootState) => state.wallet.avatar

export const selectIsWalletConnected = (state: RootState) =>
  state.wallet.isConnected

export const selectTokenBalances = (state: RootState) => state.wallet.balances

export const selectTokenBalanceByAddress = createSelector(
  [selectTokenBalances, (_, tokenAddress) => tokenAddress],
  (balances, tokenAddress) => balances[tokenAddress]?.balance ?? 0n
)

export const selectTokenSymbolByAddress = createSelector(
  [selectTokenBalances, (_, tokenAddress) => tokenAddress],
  (balances, tokenAddress) => balances[tokenAddress]?.symbol ?? ""
)

export const selectTokenBalanceBySymbol = createSelector(
  [selectTokenBalances, (_, tokenSymbol) => tokenSymbol],
  (balances, tokenSymbol) => {
    const tokenBalance = Object.values(balances).find(
      (balance) => balance.symbol === tokenSymbol
    )
    return tokenBalance?.balance ?? 0n
  }
)

export const selectTransactionStatusById = createSelector(
  [(_, id) => id, (state: RootState) => state.wallet.transactionStatus],
  (id, transactionStatus) =>
    transactionStatus[id] ?? TransactionProgressStatus.Idle
)
