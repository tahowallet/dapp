import React from "react"
import Button from "shared/components/Button"
import RegionBanner from "shared/components/RegionModal/RegionBanner"

type BannerJoinProps = {
  isDisabled: boolean
}

export default function BannerJoin({ isDisabled }: BannerJoinProps) {
  return (
    <RegionBanner
      label="In order to join a region, you need to stake $TAHO into that region."
      button={
        <Button size="large" isDisabled={isDisabled}>
          Stake to join region
        </Button>
      }
    />
  )
}
