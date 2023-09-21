import React from "react"
import { selectStakingRegionId, useDappSelector } from "redux-state"
import Button from "shared/components/Button"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import { useMapContext } from "shared/hooks"

export default function BannerTakeToNode() {
  const { onRegionClick } = useMapContext().current
  const stakingRegionContractId = useDappSelector(selectStakingRegionId)

  return (
    <RegionBanner
      label="You are already staked in another node,"
      showHint
      style={{ marginTop: 24, marginBottom: 0 }}
      button={
        <Button
          onClick={() =>
            stakingRegionContractId && onRegionClick(stakingRegionContractId)
          }
        >
          Take me to my node
        </Button>
      }
    />
  )
}
