import React from "react"
import { selectRealmById, useDappSelector } from "redux-state"
import Button from "shared/components/Button"
import CongratulationsModal from "shared/components/Modals/CongratulationsModal"
import RealmIcon from "shared/components/RealmIcon"

type ClaimCongratulationsProps = {
  amount: string
  description: string
  realmId: string
  close: () => void
}

export default function ClaimCongratulations({
  amount,
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
        <div className="taho_amount">{amount}</div>
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
