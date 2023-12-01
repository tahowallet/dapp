import { createSelector } from "@reduxjs/toolkit"
import { TransactionProgressStatus } from "shared/types"
import { truncateAddress } from "shared/utils"
import { createWalletSelector } from "redux-state/selectors"

export const selectWalletAddress = createWalletSelector("address")
export const selectWalletAvatar = createWalletSelector("avatar")
export const selectWalletAvatarType = createWalletSelector("avatarType")
export const selectWalletNameProperty = createWalletSelector("name")
export const selectIsWalletConnected = createWalletSelector("isConnected")
export const selectHasLoadedBalances = createWalletSelector("hasLoadedBalances")
export const selectWalletTransactionStatus =
  createWalletSelector("transactionStatus")

export const selectWalletTruncatedAddress = createSelector(
  selectWalletAddress,
  (address: string) => truncateAddress(address)
)

export const selectWalletName = createSelector(
  [selectWalletNameProperty, selectWalletTruncatedAddress],
  (name, address) => name || address
)

export const selectTransactionStatusById = createSelector(
  [(_, id: string) => id, selectWalletTransactionStatus],
  (id, transactionStatus) =>
    transactionStatus[id] ?? TransactionProgressStatus.Idle
)
