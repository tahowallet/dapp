import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import {
  useDappDispatch,
  claimTaho,
  useDappSelector,
  selectTransactionStatusById,
  stopTrackingTransactionStatus,
} from "redux-state"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { ROUTES } from "shared/constants"
import { useTransactionSuccessCallback } from "shared/hooks/transactions"

const CLAIM_TX_ID = "claim"

export default function ClaimingTransactions({
  isOpen,
  close,
}: {
  isOpen: boolean
  close: () => void
}) {
  const dispatch = useDappDispatch()
  const history = useHistory()
  const claimTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, CLAIM_TX_ID)
  )

  const signClaim = () => {
    dispatch(claimTaho({ id: CLAIM_TX_ID }))
  }

  const claimSuccessCallback = useCallback(() => {
    dispatch(stopTrackingTransactionStatus(CLAIM_TX_ID))
    history.push(ROUTES.CLAIM.FINISH)
  }, [dispatch, history])

  useTransactionSuccessCallback(claimTransactionStatus, claimSuccessCallback)

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
