import React, { useContext } from "react"
import { Redirect, useHistory } from "react-router-dom"
import ClaimHeader from "./shared/ClaimHeader"
import Button from "../shared/components/Button"
import ClaimCheckRules from "./shared/ClaimCheckRules"
import Modal from "../shared/components/Modal"
import { ClaimContext } from "./hooks"

export default function ClaimCheckFail({
  resetClaiming,
}: {
  resetClaiming: () => void
}) {
  const history = useHistory()
  const {
    userDetails: { name, isConnected },
  } = useContext(ClaimContext)

  if (!isConnected && !name) {
    return <Redirect to="/claim" />
  }

  return (
    <Modal.Container type="map-with-overlay">
      <Modal.Content>
        <div className="fail_container column_center">
          <ClaimHeader
            season="Season 1"
            header="Not eligible"
            subheader={
              <>
                <span style={{ color: "var(--semantic-info)" }}>{name}</span> is
                not eligible to claim:
              </>
            }
          />
          <ClaimCheckRules />
          <Button
            type="primary"
            size="large"
            onClick={() => {
              resetClaiming()
              history.push("/claim")
            }}
          >
            Try another address
          </Button>
        </div>
        <style jsx>{`
          .fail_container {
            padding: 40px 148px;
            gap: 40px;
          }
        `}</style>
      </Modal.Content>
    </Modal.Container>
  )
}
