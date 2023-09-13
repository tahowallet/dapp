import React from "react"
import RegionBanner from "shared/components/RegionModal/RegionBanner"

export default function TakeMeToMyNodeBanner() {
  return (
    <RegionBanner
      label="You are already staked in another node,"
      alignElements="center"
      noMarginBottom
      buttonProps={{ children: "Take me to my node" }}
    />
  )
}
