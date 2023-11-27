import React, { useState } from "react"
import TabPanel from "shared/components/TabPanel"
import {
  selectEligibility,
  selectHasClaimed,
  selectStakingRealmAddress,
  useDappSelector,
} from "redux-state"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"
import BannerJoin from "./RealmBanners/BannerJoin"
import BannerClaim from "./RealmBanners/BannerClaim"
import Quests from "./Quests"
import Guardians from "./Guardians"

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
  const stakingRealmAddress = useDappSelector(selectStakingRealmAddress)
  const eligibility = useDappSelector(selectEligibility)
  const hasClaimed = useDappSelector(selectHasClaimed)

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
            label: "Quests",
            component: <Quests />,
          },
          {
            label: "Stake",
            // component: <Staking close={onClose} />,
            component: <Staking />,
          },
          { label: "Leaderboard", component: <Leaderboard /> },
          {
            label: "Guardians",
            component: <Guardians />,
          },
        ]}
      />
    </>
  )
}
