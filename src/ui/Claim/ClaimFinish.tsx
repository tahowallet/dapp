import React from "react"
import { useHistory } from "react-router-dom"
import TahoAmount from "shared/components/Interface/TahoAmount"
import Button from "shared/components/Interface/Button"
import Modal from "shared/components/Dialogs/Modal"
import { useDappSelector, selectEligibility } from "redux-state"
import { ROUTES } from "shared/constants"
import ClaimHeader from "./components/ClaimHeader"

export default function ClaimFinish() {
  const location = useHistory()
  const eligibility = useDappSelector(selectEligibility)

  return (
    <Modal.Container type="island-without-overlay">
      <Modal.AnimatedContent>
        <div className="finish_container column_center">
          <ClaimHeader header="You have landed" subheader="You just claimed:" />
          <TahoAmount amount={eligibility?.amount} hasBackground size="large" />
          <div className="button_container column_center">
            <div>Shall we start the game?</div>
            <Button
              onClick={() => location.push(ROUTES.HOME)}
              type="primary"
              size="large"
            >
              Go to island & choose realm
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
      </Modal.AnimatedContent>
    </Modal.Container>
  )
}
