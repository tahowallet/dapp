import React from "react"
import { useHistory } from "react-router-dom"
import ClaimHeader from "./shared/ClaimHeader"
import ClaimAmount from "./shared/ClaimAmount"
import Button from "../shared/components/Button"
import Modal from "../shared/components/Modal"

export default function ClaimFinish() {
  const location = useHistory()

  return (
    <Modal>
      <div className="finish_container column_center">
        <ClaimHeader header="You have landed" subheader="You just claimed:" />
        <ClaimAmount amount={327000} hasBackground size="large" />
        <div className="button_container column_center">
          <div>Shall we start the game?</div>
          <Button
            onClick={() => location.replace("/")}
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
    </Modal>
  )
}
