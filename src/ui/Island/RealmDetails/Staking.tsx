import React from "react"
import {
  useDappSelector,
  selectTokenBalanceByAddress,
  selectStakingRealmAddress,
  selectIsStakingRealmDisplayed,
  selectDisplayedRealmVeTokenAddress,
} from "redux-state"
import { TAHO_ADDRESS } from "shared/constants"

import BannerEarn from "./RealmBanners/BannerEarn"
import BannerTakeToRealm from "./RealmBanners/BannerTakeToRealm"
import UnstakeForm from "./StakingForms/UnstakeForm"
import StakeForm from "./StakingForms/StakeForm"

function isFormDisabled(
  balance: bigint,
  hasStakingRealm: boolean,
  isStakingRealm: boolean
) {
  return balance === 0n || (hasStakingRealm && !isStakingRealm)
}

type StakingProps = {
  close: () => void
}
export default function Staking({ close }: StakingProps) {
  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const stakingRealmContractAddress = useDappSelector(selectStakingRealmAddress)
  const isStakingRealm = useDappSelector(selectIsStakingRealmDisplayed)
  const hasStakingRealm = !!stakingRealmContractAddress

  const tahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, TAHO_ADDRESS)
  )
  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRealmVeTokenAddress)
  )

  const disabledStake = isFormDisabled(
    tahoBalance,
    hasStakingRealm,
    isStakingRealm
  )
  const disabledUnstake = isFormDisabled(
    veTahoBalance,
    hasStakingRealm,
    isStakingRealm
  )

  const shouldLinkToRealm = hasStakingRealm && !isStakingRealm
  const shouldLinkToReferrals = !shouldLinkToRealm && tahoBalance === 0n

  return (
    <>
      {shouldLinkToRealm && <BannerTakeToRealm />}
      {shouldLinkToReferrals && <BannerEarn close={close} />}

      <div className="staking">
        <StakeForm isDisabled={disabledStake} />
        <UnstakeForm isDisabled={disabledUnstake} balance={veTahoBalance} />
      </div>
      <style jsx>{`
        .staking {
          display: flex;
          gap: 32px;
          padding: 24px 0;
        }
      `}</style>
    </>
  )
}
