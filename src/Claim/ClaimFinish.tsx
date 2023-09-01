import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import TahoAmount from "shared/components/TahoAmount"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"
import ClaimHeader from "./shared/ClaimHeader"
import { ClaimContext } from "./hooks"

export default function ClaimFinish() {
  const location = useHistory()
  const {
    claimDetails: { eligibility },
  } = useContext(ClaimContext)

  return (
    <Modal.Container type="map-without-overlay">
      <Modal.Content>
        <div className="finish_container column_center">
          <ClaimHeader header="You have landed" subheader="You just claimed:" />
          <TahoAmount amount={eligibility.amount} hasBackground size="large" />
          <div className="button_container column_center">
            <div>Shall we start the game?</div>
            <Button
              onClick={() => location.push("/")}
              type="primary"
              size="large"
            >
              Go to map & choose region
            </Button>
          </div>
        </div>
        <style jsx>{`
          .finish_container {
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
