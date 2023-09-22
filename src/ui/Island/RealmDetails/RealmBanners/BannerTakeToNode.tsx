import React from "react"
import { selectStakingRegionAddress, useDappSelector } from "redux-state"
import Button from "shared/components/Button"
import RegionBanner from "shared/components/RealmModal/RealmBanner"
import { useIslandContext } from "shared/hooks"

export default function BannerTakeToNode() {
  const { onRegionClick } = useIslandContext().current
  const stakingRegionContractAddress = useDappSelector(
    selectStakingRegionAddress
  )

  return (
    <RegionBanner
      label="You are already staked in another node,"
      showHint
      style={{ marginTop: 24, marginBottom: 0 }}
      button={
        <Button
          onClick={() =>
            stakingRegionContractAddress &&
            onRegionClick(stakingRegionContractAddress)
          }
        >
          Take me to my node
        </Button>
      }
    />
  )
}
