import React from "react"
import { useHistory } from "react-router-dom"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"
import {
  useDispatch,
  useSelector,
  selectClaimingUser,
  resetClaiming,
  setUseConnectedWalletToClaim,
} from "redux-state"
import ClaimHeader from "./shared/ClaimHeader"
import ClaimCheckRules from "./shared/ClaimCheckRules"

export default function ClaimCheckFail() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { name } = useSelector(selectClaimingUser)

  const reset = () => {
    dispatch(setUseConnectedWalletToClaim({ useConnectedWallet: false }))
    dispatch(resetClaiming())
    history.push("/claim")
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
      </Modal.Content>
    </Modal.Container>
  )
}
