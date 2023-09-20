import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { useDappDispatch, claimTaho } from "redux-state"
import { TransactionProgressStatus } from "shared/types"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { ROUTES } from "shared/constants"

export default function ClaimingTransactions({
  isOpen,
  close,
}: {
  isOpen: boolean
  close: () => void
}) {
  const dispatch = useDappDispatch()
  const [shouldRedirect] = useState(false) // TODO: add redirect on success

  const signClaim = () => {
    dispatch(claimTaho())
  }

  if (shouldRedirect) {
    return <Redirect to={ROUTES.CLAIM.FINISH} />
  }

  return (
    <TransactionsModal
      isOpen={isOpen}
      close={close}
      transactions={[
        {
          id: "claim",
          title: "1. Claim your $TAHO",
          buttonLabel: "Claim",
          status: TransactionProgressStatus.Idle, // TODO: add status
          sendTransaction: signClaim,
        },
      ]}
    />
  )
}
