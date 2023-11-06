import { RootState } from "redux-state/reducers"
import { truncateAddress } from "shared/utils"
import { createClaimSelector } from "redux-state/selectors"

export const selectHasClaimed = createClaimSelector("hasClaimed")
export const selectEligibility = createClaimSelector("eligibility")
export const selectRealmId = createClaimSelector("selectedRealmId")
export const selectClaimingStakeAmount = createClaimSelector("stakeAmount")
export const selectClaimAdress = createClaimSelector("address")
export const selectClaimName = createClaimSelector("name")
export const selectUseConnectedWalletToClaim =
  createClaimSelector("useConnectedWallet")
export const selectRepresentativeAddress = createClaimSelector(
  "representativeAddress"
)
export const selectClaimingSelectedRealmId =
  createClaimSelector("selectedRealmId")

export const selectClaimingUser = (state: RootState) => ({
  name: selectClaimName(state) || truncateAddress(selectClaimAdress(state)),
  address: selectClaimAdress(state),
})
