import React, { useContext } from "react"
import { Redirect, useHistory } from "react-router-dom"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"
import { useConnect } from "shared/hooks"
import ClaimHeader from "./shared/ClaimHeader"
import ClaimCheckRules from "./shared/ClaimCheckRules"
import { ClaimContext, DEFAULT_CLAIM_STATE } from "./hooks"
import { ClaimProps } from "./types"

export default function ClaimCheckFail({ setClaimingAccount }: ClaimProps) {
  const history = useHistory()
  const { disconnect } = useConnect()

  const {
    userDetails: { name, isConnected },
  } = useContext(ClaimContext)

  const resetClaimingAccount = () => {
    // disconnecting wallet because if it was connected then current
    // account wasn't eligible anyway and keeping it connected would
    // just confuse the user why they need to connect again to claim
    disconnect()
    setClaimingAccount(DEFAULT_CLAIM_STATE)
  }
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
              resetClaimingAccount()
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
