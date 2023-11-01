import React, { useCallback, useEffect } from "react"

import {
  useDappDispatch,
  useDappSelector,
  selectDisplayedRealmId,
  claimXp,
  selectTransactionStatusById,
  stopTrackingTransactionStatus,
} from "redux-state"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { useTransactionSuccessCallback } from "shared/hooks"

const CLAIM_XP_TX_ID = "claim-xp"

export default function XpClaimModal({
  isOpen,
  onClaim,
  onClose,
}: {
  isOpen: boolean
  onClaim: () => void
  onClose: () => void
}) {
  const dispatch = useDappDispatch()
  const realmId = useDappSelector(selectDisplayedRealmId)
  const claimXpTransactionStatus = useDappSelector((state) =>
    selectTransactionStatusById(state, CLAIM_XP_TX_ID)
  )

  const claimTransaction = () => {
    if (realmId) {
      dispatch(claimXp({ id: CLAIM_XP_TX_ID, realmId }))
    }
  }

  const claimTransactionSuccessCallback = useCallback(() => {
    dispatch(stopTrackingTransactionStatus(CLAIM_XP_TX_ID))
    onClaim()
    onClose()
  }, [dispatch, onClose, onClaim])

  useTransactionSuccessCallback(
    claimXpTransactionStatus,
    claimTransactionSuccessCallback
  )

  useEffect(
    () => () => {
      dispatch(stopTrackingTransactionStatus(CLAIM_XP_TX_ID))
    },
    [dispatch]
  )

  const claimTransactionData = {
    id: CLAIM_XP_TX_ID,
    title: "Sign transaction to claim XP",
    buttonLabel: "Claim XP",
    status: claimXpTransactionStatus,
    onClick: claimTransaction,
  }

  return (
    <TransactionsModal
      isOpen={isOpen}
      close={() => onClose()}
      transactions={[claimTransactionData]}
    />
  )
}
