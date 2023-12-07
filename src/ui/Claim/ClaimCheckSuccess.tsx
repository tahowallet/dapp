import React from "react"
import { useHistory } from "react-router-dom"
import Modal from "shared/components/Dialogs/Modal"
import TahoAmount from "shared/components/Interface/TahoAmount"
import iconConnected from "shared/assets/icons/s/connected.svg"
import Button from "shared/components/Interface/Button"
import { useConnect } from "shared/hooks"
import {
  useDappSelector,
  selectClaimingUser,
  selectEligibility,
  useDappDispatch,
  setUseConnectedWalletToClaim,
  resetClaiming,
  selectIsWalletConnected,
  selectWalletAddress,
} from "redux-state"
import { isSameAddress } from "shared/utils"
import { ROUTES } from "shared/constants"
import ClaimCheckRules from "./components/ClaimCheckRules"
import ClaimHeader from "./components/ClaimHeader"

export default function ClaimCheckSuccess() {
  const history = useHistory()
  const dispatch = useDappDispatch()
  const isConnected = useDappSelector(selectIsWalletConnected)
  const { connect } = useConnect()
  const { name: claimingName, address: claimingAddress } =
    useDappSelector(selectClaimingUser)
  const connectedAddress = useDappSelector(selectWalletAddress)
  const eligibility = useDappSelector(selectEligibility)

  const isCorrectUserConnected =
    isConnected && isSameAddress(connectedAddress, claimingAddress)

  const connectWallet = () => {
    if (isConnected) {
      // TODO: reconnection to the correct wallet needs to be polished and new UI needs to be implemented
      dispatch(resetClaiming())
      dispatch(setUseConnectedWalletToClaim({ useConnectedWallet: true }))
    } else {
      connect()
    }
  }

  return (
    <Modal.Container type="island-with-overlay">
      <Modal.AnimatedContent>
        <div className="success_container column_center">
          <ClaimHeader
            season="Season 1"
            header="Congratulations!"
            subheader={
              <>
                <span style={{ color: "var(--semantic-info)" }}>
                  {claimingName}
                </span>{" "}
                is eligible to claim:
              </>
            }
          />
          <TahoAmount amount={eligibility?.amount} hasBackground size="large" />
          <ClaimCheckRules />
          <div className="button_container">
            <Button
              type="primary"
              size="large"
              isDisabled={isCorrectUserConnected}
              iconSrc={isCorrectUserConnected ? iconConnected : undefined}
              iconPosition="left"
              onClick={connectWallet}
            >
              {isCorrectUserConnected ? "Connected" : "Connect wallet"}
            </Button>
            <Button
              onClick={() => history.push(ROUTES.CLAIM.DETAILS)}
              isDisabled={!isCorrectUserConnected}
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
      </Modal.AnimatedContent>
    </Modal.Container>
  )
}
