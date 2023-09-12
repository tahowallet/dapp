import React from "react"
import TabPanel from "shared/components/TabPanel"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"
import ConnectWalletBanner from "shared/components/RegionModal/RegionBanners/ConnectWalletBanner"
import JoinRegionBanner from "shared/components/RegionModal/RegionBanners/JoinRegionBanner"
import ClaimBanner from "shared/components/RegionModal/RegionBanners/ClaimBanner"

// Test data to display valid banner
const WALLET_CONNECTED: boolean = true
const VOTING: boolean = false
const STAKED: string | boolean = true
const HAS_FUNDS: boolean = false

export default function RegionDetails() {
  return (
    <>
      <div className="region_banner_container">
        {!WALLET_CONNECTED && <ConnectWalletBanner />}
        {WALLET_CONNECTED && !STAKED && (
          <JoinRegionBanner isDisabled={!VOTING} />
        )}
        {WALLET_CONNECTED && !HAS_FUNDS && STAKED === "disabled" && (
          <ClaimBanner />
        )}
      </div>
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
      <style jsx>
        {`
          .region_banner_container {
            width: 671px;
          }
        `}
      </style>
    </>
  )
}
