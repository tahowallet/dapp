import React from "react"
import { useHistory } from "react-router-dom"
import Modal from "shared/components/Modal"
import TahoAmount from "shared/components/TahoAmount"
import iconConnected from "shared/assets/icons/s/connected.svg"
import Button from "shared/components/Button"
import { useConnect } from "shared/hooks"
import { useSelector, selectClaimingUser, selectEligibility } from "redux-state"
import { selectIsWalletConnected } from "redux-state/slices/wallet"
import ClaimCheckRules from "./shared/ClaimCheckRules"
import ClaimHeader from "./shared/ClaimHeader"

export default function ClaimCheckSuccess() {
  const history = useHistory()
  const isConnected = useSelector(selectIsWalletConnected)
  const { connect } = useConnect()
  const { name } = useSelector(selectClaimingUser)
  const eligibility = useSelector(selectEligibility)

  return (
    <Modal.Container type="map-with-overlay">
      <Modal.Content>
        <div className="success_container column_center">
          <ClaimHeader
            season="Season 1"
            header="Congratulation!"
            subheader={
              <>
                <span style={{ color: "var(--semantic-info)" }}>{name}</span> is
                eligible to claim:
              </>
            }
          />
          <TahoAmount amount={eligibility.amount} hasBackground size="large" />
          <ClaimCheckRules />
          <div className="button_container">
            <Button
              type="primary"
              size="large"
              isDisabled={isConnected}
              iconSrc={isConnected ? iconConnected : undefined}
              iconPosition="left"
              onClick={() => connect()}
            >
              {isConnected ? "Connected" : "Connect wallet"}
            </Button>
            <Button
              onClick={() => history.push("/claim/claiming")}
              isDisabled={!isConnected}
              type="primary"
              size="large"
            >
              Start claiming process
            </Button>
          </div>
        </div>
        <style jsx>
          {`
            .success_container {
              display: flex;
              flex-direction: column;
              padding: 40px 148px;
              gap: 40px;
            }
            .button_container {
              width: 555px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          `}
        </style>
      </Modal.Content>
    </Modal.Container>
  )
}
