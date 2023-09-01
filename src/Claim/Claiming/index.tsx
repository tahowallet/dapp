import React from "react"
import ClaimingStats from "./ClaimingStats"
import ClaimingFlow from "./ClaimingFlow"
import Modal from "shared/components/Modal"

export default function Claiming() {
  return (
    <Modal.Container type="map-with-overlay">
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
