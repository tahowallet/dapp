import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"
import TahoAmount from "shared/components/TahoAmount"
import { ClaimContext } from "./hooks"
import ClaimHeader from "./shared/ClaimHeader"

export default function ClaimAlreadyClaimed() {
  const location = useHistory()
  const {
    claimDetails: { eligibility },
  } = useContext(ClaimContext)

  return (
    <Modal.Container type="map-without-overlay">
      <Modal.Content>
        <div className="claimed_container column_center">
          <ClaimHeader header="Already claimed" />
          <TahoAmount amount={eligibility.amount} hasBackground size="large" />
          <div className="button_container column_center">
            <Button
              onClick={() => location.push("/referrals")}
              type="primary"
              size="large"
            >
              Take me to Referrals
            </Button>
          </div>
        </div>
        <style jsx>{`
          .claimed_container {
            padding: 48px;
            width: 720px;
            gap: 48px;
          }
          .button_container {
            gap: 16px;
          }
        `}</style>
      </Modal.Content>
    </Modal.Container>
  )
}
