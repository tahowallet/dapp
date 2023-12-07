import React from "react"
import {
  selectRealmById,
  useDappSelector,
  selectDisplayedRealmId,
} from "redux-state"
import Button from "shared/components/Interface/Button"
import CongratulationsModal from "ui/Island/Modals/CongratulationsModal"
import { RealmCutout } from "shared/components/Realm"

type StakeCongratulationsModalProps = {
  isOpen: boolean
  close: () => void
}

export default function StakeCongratulationsModal({
  close,
  isOpen,
}: StakeCongratulationsModalProps) {
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  if (!isOpen) return null

  return (
    <CongratulationsModal
      header="Congratulations!"
      subheader={`You are now a citizen of ${realm?.name}!`}
      buttons={
        <Button size="large" onClick={close}>
          Go to your realm
        </Button>
      }
      close={close}
    >
      <RealmCutout />
    </CongratulationsModal>
  )
}
