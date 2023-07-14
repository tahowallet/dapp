import React from "react"

export default function ClaimCheck() {
  return (
    <div className="claimCheckContainer">
      <div className="claimHeaderContainer">
        <div>Season 1</div>
        <h1>Check if you are eligible</h1>
        <div>Check if you are eligible to claim TAHO tokens</div>
      </div>
      <div>
        <input placeholder="Address / Ens / Uns..." />
        <button>Check eligibility</button>
      </div>
      <style jsx>{`
        .claimCheckContainer {
          padding: 40px 106px 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .claimHeaderContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
