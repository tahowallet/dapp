import React from "react"
import {
  selectEligibility,
  selectHasClaimed,
  selectStakingRealmAddress,
  useDappSelector,
} from "redux-state"
import BannerClaim from "./RealmBanners/BannerClaim"

type RealmDetailsProps = {
  onClose: () => void
}

function RealmDetailsBanner({ onClose }: RealmDetailsProps) {
  const stakingRealmAddress = useDappSelector(selectStakingRealmAddress)
  const eligibility = useDappSelector(selectEligibility)
  const hasClaimed = useDappSelector(selectHasClaimed)

  if (!stakingRealmAddress && eligibility && !hasClaimed) {
    return <BannerClaim close={onClose} />
  }

  return null
}

export default function RealmDetails({ onClose }: RealmDetailsProps) {
  return <RealmDetailsBanner onClose={onClose} />
}
