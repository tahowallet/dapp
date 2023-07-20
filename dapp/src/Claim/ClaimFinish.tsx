import React from "react"
import ClaimHeader from "./ClaimHeader"
import ClaimAmount from "./ClaimAmount"
import Button from "../shared/Button"

export default function ClaimFinish() {
  return (
    <>
      <div className="finish_container column_center">
        <ClaimHeader header="You have landed" subheader="You just claimed:" />
        <ClaimAmount amount={327000} hasBackground size="large" />
        <div className="button_container column_center">
          <div>Shall we start the game?</div>
          <Button type="primary" size="large">
            Go to map & choose region
          </Button>
        </div>
      </div>
      <style jsx>{`
        .finish_container {
          padding: 48px;
          width: 720px;
          gap: 48px;
        }
        .button_container {
          gap: 16px;
        }
      `}</style>
    </>
  )
}
