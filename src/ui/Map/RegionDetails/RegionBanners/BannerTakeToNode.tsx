import React from "react"
import Button from "shared/components/Button"
import RegionBanner from "shared/components/RegionModal/RegionBanner"
import { useMapContext } from "shared/hooks"

type BannerTakeToNodeProps = {
  regionId: string
}

const MY_NODE_ID = "19" // id to be changed

export default function BannerTakeToNode({ regionId }: BannerTakeToNodeProps) {
  const { onRegionClick } = useMapContext().current

  if (regionId === MY_NODE_ID) return null

  return (
    <RegionBanner
      label="You are already staked in another node,"
      style={{ marginTop: 24, marginBottom: 0 }}
      button={
        <Button onClick={() => onRegionClick(MY_NODE_ID)}>
          Take me to my node
        </Button>
      }
    />
  )
}
