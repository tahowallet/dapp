import React from "react"
import { useHistory } from "react-router-dom"
import Button from "../../shared/Button"

export default function ClaimingSignPledge() {
  const location = useHistory()

  return (
    <div>
      <h1>Sign the Taho Community Pledge</h1>
      <Button type="primary" size="large" isDisabled>
        1. Sign in with Ethereum
      </Button>
      <Button
        onClick={() => location.replace("/claim/claiming/delegate")}
        type="primary"
        size="large"
      >
        2. Sign Pledge
      </Button>
    </div>
  )
}
