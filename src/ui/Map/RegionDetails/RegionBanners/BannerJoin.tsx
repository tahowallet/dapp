import React from "react"
import Button from "shared/components/Button"
import RegionBanner from "shared/components/RegionModal/RegionBanner"

type BannerJoinProps = {
  isDisabled: boolean
  redirect: () => void
}

export default function BannerJoin({ isDisabled, redirect }: BannerJoinProps) {
  return (
    <RegionBanner
      label="In order to join a region, you need to stake $TAHO into that region."
      showHint
      button={
        <Button size="large" onClick={redirect} isDisabled={isDisabled}>
          Stake to join region
        </Button>
      }
    />
  )
}
