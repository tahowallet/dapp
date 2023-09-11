import { RootState } from "redux-state/reducers"
import { truncateAddress } from "shared/utils"

export const selectClaimingUser = (state: RootState) => ({
  name: state.claim.name || truncateAddress(state.claim.address),
  address: state.claim.address,
})

export const selectHasClaimed = (state: RootState) => state.claim.hasClaimed

export const selectEligibility = (state: RootState) => state.claim.eligibility

export const selectUseConnectedWalletToClaim = (state: RootState) =>
  state.claim.useConnectedWallet

export const selectRegionId = (state: RootState) => state.claim.selectedRegionId
