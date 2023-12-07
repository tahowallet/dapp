import React from "react"
import { useHistory } from "react-router-dom"
import Button from "shared/components/Interface/Button"
import Modal from "shared/components/Dialogs/Modal"
import {
  useDappDispatch,
  useDappSelector,
  selectClaimingUser,
  resetClaiming,
  setUseConnectedWalletToClaim,
} from "redux-state"
import { ROUTES } from "shared/constants"
import ClaimHeader from "./components/ClaimHeader"
import ClaimCheckRules from "./components/ClaimCheckRules"

export default function ClaimCheckFail() {
  const history = useHistory()
  const dispatch = useDappDispatch()
  const { name } = useDappSelector(selectClaimingUser)

  const reset = () => {
    dispatch(setUseConnectedWalletToClaim({ useConnectedWallet: false }))
    dispatch(resetClaiming())
    history.push(ROUTES.CLAIM.HOME)
  }

  return (
    <Modal.Container type="island-with-overlay">
      <Modal.AnimatedContent>
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
          <Button type="primary" size="large" onClick={reset}>
            Try another address
          </Button>
        </div>
        <style jsx>{`
          .fail_container {
            padding: 40px 148px;
            gap: 40px;
          }
        `}</style>
      </Modal.AnimatedContent>
    </Modal.Container>
  )
}
