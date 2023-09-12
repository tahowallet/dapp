import React from "react"
import RegionBanner from "shared/components/RegionModal/RegionBanner"

export default function JoinRegionBanner() {
  return (
    <RegionBanner
      label="In order to join a region, you need to stake $TAHO into that region."
      buttonProps={{ size: "large", children: "Stake to join region" }}
    />
  )
}
