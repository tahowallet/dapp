import React from "react"
import { useHistory } from "react-router-dom"
import Button from "../../shared/Button"

export default function ClaimingSignTx() {
  const location = useHistory()

  return (
    <>
      <h1>Sign 2 transaction to Claim</h1>

      <Button
        onClick={() => location.replace("/claim/finish")}
        type="primary"
        size="large"
      >
        Delegate
      </Button>
      <Button
        onClick={() => location.replace("/claim/finish")}
        type="primary"
        size="large"
      >
        Claim TAHO
      </Button>
    </>
  )
}
