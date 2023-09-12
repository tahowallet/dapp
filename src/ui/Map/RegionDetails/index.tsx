import React from "react"
import TabPanel from "shared/components/TabPanel"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"
import ConnectWalletBanner from "shared/components/RegionModal/RegionBanners/ConnectWalletBanner"
import JoinRegionBanner from "shared/components/RegionModal/RegionBanners/JoinRegionBanner"
import TakeMeToMyNodeBanner from "shared/components/RegionModal/RegionBanners/TakeMeToMyNodeBanner"
import EarnTahoBanner from "shared/components/RegionModal/RegionBanners/EarnTahoBanner"
import ClaimBanner from "shared/components/RegionModal/RegionBanners/ClaimBanner"

export default function RegionDetails() {
  return (
    <>
      <ConnectWalletBanner />
      {/* <JoinRegionBanner /> */}
      {/* <TakeMeToMyNodeBanner /> */}
      {/* <EarnTahoBanner /> */}
      {/* <ClaimBanner /> */}
      <TabPanel
        tabs={[
          {
            label: "Rewards",
            component: null, // TODO: <Rewards />
          },
          { label: "Stake", component: <Staking /> },
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
