import React from "react"
import TabPanel from "shared/components/TabPanel"
import {
  selectEligibility,
  selectHasClaimed,
  selectIsWalletConnected,
  selectStakingRegionAddress,
  useDappSelector,
} from "redux-state"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"
import BannerConnect from "./RegionBanners/BannerConnect"
import BannerJoin from "./RegionBanners/BannerJoin"
import BannerClaim from "./RegionBanners/BannerClaim"
import BannerRewards from "./RegionBanners/BannerRewards"

type RegionDetailsProps = {
  onClose: () => void
}

type RegionDetailsBannerProps = RegionDetailsProps & {
  activeTab: number
  setActiveTab: (index: number) => void
}

const STAKE_TAB_INDEX = 1

function RegionDetailsBanner({
  onClose,
  activeTab,
  setActiveTab,
}: RegionDetailsBannerProps) {
  const isConnected = useDappSelector(selectIsWalletConnected)
  const stakingRegionAddress = useDappSelector(selectStakingRegionAddress)
  const eligibility = useDappSelector(selectEligibility)
  const hasClaimed = useDappSelector(selectHasClaimed)

  if (!isConnected) {
    return <BannerConnect />
  }

  if (!stakingRegionAddress && eligibility && !hasClaimed) {
    return <BannerClaim close={onClose} />
  }

  if (!stakingRegionAddress) {
    return (
      <BannerJoin
        redirect={() => setActiveTab(STAKE_TAB_INDEX)}
        isDisabled={activeTab === STAKE_TAB_INDEX}
      />
    )
  }

  if (stakingRegionAddress) {
    return <BannerRewards />
  }

  return null
}

export default function RegionDetails({ onClose }: RegionDetailsProps) {
  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <>
      <RegionDetailsBanner
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
            component: null, // TODO: <Rewards />
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
