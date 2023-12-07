import React from "react"
import { selectRealmById, useDappSelector } from "redux-state"
import Button from "shared/components/Interface/Button"
import CongratulationsModal from "ui/Island/Modals/CongratulationsModal"
import RealmIcon from "ui/Island/Realms/RealmIcon"

type ClaimCongratulationsProps = {
  displayAmount: string
  description: string
  realmId: string
  close: () => void
}

export default function ClaimCongratulations({
  displayAmount,
  description,
  realmId,
  close,
}: ClaimCongratulationsProps) {
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  return (
    <>
      <CongratulationsModal
        header="Congratulations!"
        subheader="You just claimed"
        buttons={
          <Button size="large" onClick={close}>
            Go to realm
          </Button>
        }
        close={close}
      >
        <RealmIcon
          realmId={realmId}
          color="var(--primary-p1-100)"
          type="circle"
          width="48px"
        />
        <div className="taho_amount">{displayAmount}</div>
        <p className="taho_description">{description}</p>
        <p className="taho_realm">from {realm?.name}</p>
      </CongratulationsModal>
      <style jsx>{`
        .taho_amount {
          font: var(--text-h1);
          margin-top: 8px;
        }
        .taho_description {
          color: var(--secondary-s1-70);
          margin-bottom: 11px;
        }
        .taho_realm {
          font-weight: 400;
        }
      `}</style>
    </>
  )
}
