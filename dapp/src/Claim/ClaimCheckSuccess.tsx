import React from "react"
import ClaimHeader from "./ClaimHeader"
import ClaimAmount from "./ClaimAmount"

export default function ClaimCheckSuccess() {
  return (
    <>
      <div className="success_container">
        <ClaimHeader
          season="Season 1"
          header="Congratulation!"
          subheader={
            <>
              <span style={{ color: "var(--semantic-info" }}>berrry.eth</span>{" "}
              is eligible to claim:
            </>
          }
        />
        <ClaimAmount amount={327000} hasBackground size="small" />
      </div>
      <style jsx>
        {`
          .success_container {
            display: flex;
            flex-direction: column;
            padding: 40px 148px;
            gap: 40px;
          }
        `}
      </style>
    </>
  )
}
