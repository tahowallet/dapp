import React from "react"
import Modal from "shared/components/Dialogs/Modal"
import { selectIsJoinRealmIslandMode } from "redux-state/selectors/island"
import { useDappSelector } from "redux-state"
import ClaimingStats from "./ClaimingStats"
import ClaimingFlow from "./ClaimingFlow"

export default function Claiming() {
  const isJoinRealmMode = useDappSelector(selectIsJoinRealmIslandMode)

  if (isJoinRealmMode) {
    return null
  }

  return (
    <Modal.Container type="island-with-overlay">
      <div className="steps_container column">
        <div className="steps_container_wrapper row">
          <ClaimingFlow />
          <ClaimingStats />
        </div>
        <style jsx>{`
          .steps_container {
            position: absolute;
            top: 0px;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100vw;
            height: 100vh;
            justify-content: center;
          }
          .steps_container_wrapper {
            width: 100%;
            align-items: flex-start;
            justify-content: center;
            gap: 20px;
          }
        `}</style>
      </div>
    </Modal.Container>
  )
}
