import React from "react"
import Button from "shared/components/Button"
import RegionBanner from "shared/components/RealmModal/RealmBanner"

type BannerJoinProps = {
  isDisabled: boolean
  redirect: () => void
}

export default function BannerJoin({ isDisabled, redirect }: BannerJoinProps) {
  return (
    <RegionBanner
      label="In order to join a realm, you need to stake $TAHO into that realm."
      showHint
      button={
        <Button size="large" onClick={redirect} isDisabled={isDisabled}>
          Stake to join realm
        </Button>
      }
    />
  )
}
