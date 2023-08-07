import React from "react"
import ClaimAmount from "../shared/ClaimAmount"
import Modal from "../../shared/Modal"

export default function ClaimingStats() {
  return (
    <Modal.Content>
      <div className="stats column_center">
        <h5>You can claim</h5>
        <ClaimAmount amount={37000} />
        <span>Criteria breakdown</span>
        <div className="line" />
        <h5>Community Pledge</h5>
        <span>-</span>
        <div className="line" />
        <h5>Delegate voting power</h5>
        <span>-</span>
        <div className="line" />
        <h5>Region (Suggested)</h5>
        <span>-</span>
        <div>Region IMG</div>
      </div>
      <style jsx>{`
        .stats {
          padding: 24px;
        }
      `}</style>
    </Modal.Content>
  )
}
