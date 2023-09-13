import React from "react"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import { useMapContext } from "shared/hooks"

type BannerTakeToNodeProps = {
  regionId: string
}

const MY_NODE_ID = "19" // id to be changed

export default function BannerTakeToNode({ regionId }: BannerTakeToNodeProps) {
  if (regionId === MY_NODE_ID) return null

  const { onRegionClick } = useMapContext().current

  return (
    <RegionBanner
      label="You are already staked in another node,"
      alignElements="center"
      noMarginBottom
      buttonProps={{
        children: "Take me to my node",
        onClick: () => onRegionClick(MY_NODE_ID), // id to be changed
      }}
    />
  )
}
