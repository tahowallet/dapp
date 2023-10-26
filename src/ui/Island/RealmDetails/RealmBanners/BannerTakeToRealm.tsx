import React from "react"
import { selectStakingRealmId, useDappSelector } from "redux-state"
import Button from "shared/components/Button"
import RealmBanner from "shared/components/RealmModal/RealmBanner"
import { useIslandContext } from "shared/hooks"

export default function BannerTakeToRealm() {
  const { onRealmClick } = useIslandContext().current
  const stakingRealmContractId = useDappSelector(selectStakingRealmId)

  return (
    <RealmBanner
      label="You are already staked in another realm"
      showHint
      style={{ marginTop: 24, marginBottom: 0 }}
      button={
        <Button
          onClick={() =>
            stakingRealmContractId && onRealmClick(stakingRealmContractId)
          }
        >
          Take me to my realm
        </Button>
      }
    />
  )
}
