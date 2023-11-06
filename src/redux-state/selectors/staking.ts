import { createSelector } from "@reduxjs/toolkit"
import { createIslandSelector } from "redux-state/selectors"
import { isSameAddress } from "shared/utils"
import { RootState } from "redux-state/reducers"
import { RealmData } from "shared/types"
import {
  selectDisplayedRealmAddress,
  selectRealmById,
  selectRealms,
} from "./realm"
import {
  selectClaimingSelectedRealmId,
  selectClaimingStakeAmount,
} from "./claim"

export const selectStakingRealmId = createIslandSelector("stakingRealmId")
export const selectStakeUnlockTime = createIslandSelector("stakeUnlockTime")

export const selectStakingRealmAddress = createSelector(
  selectRealms,
  selectStakingRealmId,
  (realms, stakingRealmId) =>
    stakingRealmId && realms[stakingRealmId]?.realmContractAddress
)

export const selectIsStakingRealmDisplayed = createSelector(
  selectStakingRealmAddress,
  selectDisplayedRealmAddress,
  (stakingAddress, displayedAddress) =>
    !!stakingAddress &&
    !!displayedAddress &&
    isSameAddress(stakingAddress, displayedAddress)
)

export const selectStakingData = createSelector(
  (state: RootState) =>
    selectRealmById(state, selectClaimingSelectedRealmId(state)),
  selectClaimingStakeAmount,
  (realmData: RealmData | null, stakeAmount) => ({
    realmContractAddress: realmData ? realmData.realmContractAddress : null,
    stakeAmount,
  })
)
