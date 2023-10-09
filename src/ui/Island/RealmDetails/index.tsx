import React, { useState } from "react"
import TabPanel from "shared/components/TabPanel"
import {
  selectDisplayedRealmId,
  selectEligibility,
  selectHasClaimed,
  selectIsStakingRealmDisplayed,
  selectIsWalletConnected,
  selectStakingRealmAddress,
  selectUnclaimedXpSumById,
  useDappSelector,
} from "redux-state"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"
import BannerConnect from "./RealmBanners/BannerConnect"
import BannerJoin from "./RealmBanners/BannerJoin"
import BannerClaim from "./RealmBanners/BannerClaim"
import Rewards from "./Rewards"
import BannerRewards from "./RealmBanners/BannerRewards"

type RealmDetailsProps = {
  onClose: () => void
}

type RealmDetailsBannerProps = RealmDetailsProps & {
  activeTab: number
  setActiveTab: (index: number) => void
}

const STAKE_TAB_INDEX = 1

function RealmDetailsBanner({
  onClose,
  activeTab,
  setActiveTab,
}: RealmDetailsBannerProps) {
  const isConnected = useDappSelector(selectIsWalletConnected)
  const stakingRealmAddress = useDappSelector(selectStakingRealmAddress)
  const displatedRealmId = useDappSelector(selectDisplayedRealmId)
  const eligibility = useDappSelector(selectEligibility)
  const hasClaimed = useDappSelector(selectHasClaimed)
  const isStakingRealm = useDappSelector(selectIsStakingRealmDisplayed)
  const rewardAmount = useDappSelector((state) =>
    displatedRealmId ? selectUnclaimedXpSumById(state, displatedRealmId) : 0
  )

  if (!isConnected) {
    return <BannerConnect />
  }

  if (!stakingRealmAddress && eligibility && !hasClaimed) {
    return <BannerClaim close={onClose} />
  }

  if (!stakingRealmAddress) {
    return (
      <BannerJoin
        redirect={() => setActiveTab(STAKE_TAB_INDEX)}
        isDisabled={activeTab === STAKE_TAB_INDEX}
      />
    )
  }

  if (isStakingRealm || (!isStakingRealm && rewardAmount > 0)) {
    return <BannerRewards amount={rewardAmount} />
  }

  return null
}

export default function RealmDetails({ onClose }: RealmDetailsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <RealmDetailsBanner
        onClose={onClose}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TabPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          {
            label: "Rewards",
            component: <Rewards />,
          },
          {
            label: "Stake",
            component: <Staking close={onClose} />,
          },
          { label: "Leaderboard", component: <Leaderboard /> },
          {
            label: "Council",
            component: null,
            // TODO: <Council />
          },
        ]}
      />
    </>
  )
}
