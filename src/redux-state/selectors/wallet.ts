import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"
import { TAHO_SYMBOL } from "shared/constants"
import { TransactionProgressStatus } from "shared/types"
import { truncateAddress } from "shared/utils"
import { createWalletSelector } from "redux-state/selectors"

/* Base selectors */
export const selectWalletAddress = createWalletSelector("address")
export const selectWalletAvatar = createWalletSelector("avatar")
export const selectWalletNameProperty = createWalletSelector("name")
export const selectIsWalletConnected = createWalletSelector("isConnected")
export const selectTokenBalances = createWalletSelector("balances")
export const selectHasLoadedBalances = createWalletSelector("hasLoadedBalances")
export const selectWalletTransactionStatus =
  createWalletSelector("transactionStatus")

/* Wallet identification selectors */
export const selectWalletTruncatedAddress = (state: RootState) =>
  truncateAddress(selectWalletAddress(state))

export const selectWalletName = (state: RootState) =>
  selectWalletNameProperty(state) || selectWalletTruncatedAddress(state)

/* Token selectors */
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

export const selectHasRelevantTokens = createSelector(
  selectTokenBalances,
  (balances) =>
    Object.values(balances).some((balanceData) => {
      // relevant tokens are any tokens with "TAHO" symbol
      // because this group includes both TAHO and veTAHO tokens
      if (balanceData.symbol === TAHO_SYMBOL && !!balanceData.balance) {
        return true
      }

      return false
    })
)

/* Transaction selectors */
export const selectTransactionStatusById = createSelector(
  [(_, id: string) => id, selectWalletTransactionStatus],
  (id, transactionStatus) =>
    transactionStatus[id] ?? TransactionProgressStatus.Idle
)
