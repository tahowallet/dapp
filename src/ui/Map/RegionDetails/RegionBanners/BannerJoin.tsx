import React from "react"
import RegionBanner from "shared/components/RegionModal/RegionBanner"

type BannerJoinProps = {
  isDisabled: boolean
}

export default function BannerJoin({ isDisabled }: BannerJoinProps) {
  return (
    <RegionBanner
      label="In order to join a region, you need to stake $TAHO into that region."
      buttonProps={{
        size: "large",
        children: "Stake to join region",
        isDisabled: isDisabled,
      }}
    />
  )
}
