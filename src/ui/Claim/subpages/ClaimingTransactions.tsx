import React from "react"
import { Redirect } from "react-router-dom"
import {
  useDappDispatch,
  claimTaho,
  useDappSelector,
  selectTransactionStatusById,
} from "redux-state"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { ROUTES } from "shared/constants"
import { TransactionProgressStatus } from "shared/types"

const CLAIM_TX_ID = "claim"

export default function ClaimingTransactions({
  isOpen,
  close,
}: {
  isOpen: boolean
  close: () => void
}) {
  const dispatch = useDappDispatch()
  const claimTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, CLAIM_TX_ID)
  )

  const signClaim = () => {
    dispatch(claimTaho({ id: CLAIM_TX_ID }))
  }

  if (claimTransactionStatus === TransactionProgressStatus.Done) {
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
          status: claimTransactionStatus,
          onClick: signClaim,
        },
      ]}
    />
  )
}
