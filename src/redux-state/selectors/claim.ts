import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"
import { truncateAddress } from "shared/utils"
import { RegionContractData } from "shared/types"
import { selectRegionById } from "./map"

export const selectClaimingUser = (state: RootState) => ({
  name: state.claim.name || truncateAddress(state.claim.address),
  address: state.claim.address,
})

export const selectHasClaimed = (state: RootState) => state.claim.hasClaimed

export const selectEligibility = (state: RootState) => state.claim.eligibility

export const selectUseConnectedWalletToClaim = (state: RootState) =>
  state.claim.useConnectedWallet

export const selectStakingData = createSelector(
  (state: RootState) =>
    state.claim.selectedRegionId
      ? selectRegionById(state, state.claim.selectedRegionId)
      : null,
  (state: RootState) => state.claim.stakeAmount,
  (regionData: RegionContractData | null, stakeAmount) => ({
    regionContractAddress: regionData ? regionData.regionContractAddress : null,
    stakeAmount,
  })
)

export const selectRepresentativeAddress = (state: RootState) =>
  state.claim.representativeAddress

export const selectRegionId = (state: RootState) => state.claim.selectedRegionId
