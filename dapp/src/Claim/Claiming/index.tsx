import React from "react"
import ClaimingStats from "./ClaimingStats"

export default function Claiming() {
  return (
    <>
      <div className="steps_container">
        <ClaimingStats />
      </div>
      <style jsx>{`
        .steps_container {
          display: flex;
        }
      `}</style>
    </>
  )
}
