import React from "react"
import ClaimingStats from "./ClaimingStats"
import ClaimingFlow from "./ClaimingFlow"
import Modal from "../../shared/Modal"

export default function Claiming() {
  return (
    <Modal.Container>
      <div className="steps_container">
        <ClaimingFlow />
        <ClaimingStats />
        <style jsx>{`
          .steps_container {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
        `}</style>
      </div>
    </Modal.Container>
  )
}
