import React from "react"
import Button from "shared/components/Button"
import lightIcon from "shared/assets/icons/m/light.svg"
import RegionBanner from "shared/components/RegionModal/RegionBanner"

export default function TakeMeToMyNodeBanner() {
  return (
    <RegionBanner
      label="You are already staked in another node,"
      alignElements="center"
      buttonProps={{ children: "Take me to my node" }}
    />
  )
}
