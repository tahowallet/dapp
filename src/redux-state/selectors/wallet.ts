import { RootState } from "redux-state/reducers"
import { truncateAddress } from "shared/utils"

export const selectWalletAddress = (state: RootState) => state.wallet.address

export const selectWalletTruncatedAddress = (state: RootState) =>
  truncateAddress(state.wallet.address)

export const selectWalletName = (state: RootState) =>
  state.wallet.name || truncateAddress(state.wallet.address)

export const selectWalletAvatar = (state: RootState) => state.wallet.avatar

export const selectIsWalletConnected = (state: RootState) =>
  state.wallet.isConnected
