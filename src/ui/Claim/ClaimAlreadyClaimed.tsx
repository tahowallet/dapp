import React from "react"
import { useHistory } from "react-router-dom"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"
import TahoAmount from "shared/components/TahoAmount"
import { useSelector, selectEligibility } from "redux-state"
import { ROUTES } from "shared/constants"
import ClaimHeader from "./components/ClaimHeader"

export default function ClaimAlreadyClaimed() {
  const location = useHistory()
  const eligibility = useSelector(selectEligibility)

  return (
    <Modal.Container type="map-without-overlay">
      <Modal.Content>
        <div className="claimed_container column_center">
          <ClaimHeader header="Already claimed" />
          <TahoAmount amount={eligibility?.amount} hasBackground size="large" />
          <div className="button_container column_center">
            <Button
              onClick={() => location.push(ROUTES.REFERRALS)}
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
