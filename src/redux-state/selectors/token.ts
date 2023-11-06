import { createSelector } from "@reduxjs/toolkit"
import { createWalletSelector } from "redux-state/selectors"
import { TAHO_SYMBOL } from "shared/constants"

export const selectTokenBalances = createWalletSelector("balances")

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
