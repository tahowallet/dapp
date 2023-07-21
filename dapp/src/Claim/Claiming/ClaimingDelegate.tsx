import React from "react"
import { useHistory } from "react-router-dom"
import Button from "../../shared/Button"

export default function ClaimingDelegate() {
  const location = useHistory()

  return (
    <>
      <h1>Delegate your voting power</h1>

      <Button
        onClick={() => location.replace("/claim/claiming/sign")}
        type="primary"
        size="large"
      >
        Select delegate
      </Button>
    </>
  )
}
