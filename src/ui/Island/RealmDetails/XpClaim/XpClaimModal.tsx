import React, { useCallback, useEffect, useMemo } from "react"

import {
  useDappDispatch,
  useDappSelector,
  selectDisplayedRealmId,
  claimXp,
  selectUnclaimedXpById,
  selectXpClaimTransactionStatuses,
  stopTrackingClaimTransactions,
} from "redux-state"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { useTransactionSuccessCallback } from "shared/hooks"
import { TransactionProgressStatus } from "shared/types"
import {
  bigIntToDisplayUserAmount,
  getClaimXpTransactionID,
} from "shared/utils"

const getAggregatedTransactionStatus = (
  statusArray: TransactionProgressStatus[]
) => {
  if (!statusArray.length) {
    return TransactionProgressStatus.Idle
  }
  return statusArray.every(
    (status) => status === TransactionProgressStatus.Done
  )
    ? TransactionProgressStatus.Done
    : TransactionProgressStatus.Idle
}

export default function XpClaimModal({
  isOpen,
  displayAmount,
  onClaim,
  onClose,
}: {
  isOpen: boolean
  // displayAmount - it is alerady parsed to be displayed,
  // constant amount that won't be changed after each claim
  displayAmount: string
  onClaim: () => void
  onClose: () => void
}) {
  const dispatch = useDappDispatch()
  const realmId = useDappSelector(selectDisplayedRealmId)

  const unclaimedDrops = useDappSelector((state) =>
    realmId ? selectUnclaimedXpById(state, realmId) : []
  )

  const claimXpTransactionStatus = useDappSelector((state) =>
    realmId ? selectXpClaimTransactionStatuses(state, realmId) : {}
  )

  const claimTransactionSuccessCallback = useCallback(() => {
    dispatch(stopTrackingClaimTransactions())
    onClaim()
    onClose()
  }, [onClose, onClaim, dispatch])

  useTransactionSuccessCallback(
    getAggregatedTransactionStatus(Object.values(claimXpTransactionStatus)),
    claimTransactionSuccessCallback
  )

  useEffect(
    () => () => {
      dispatch(stopTrackingClaimTransactions())
    },
    [dispatch]
  )

  const claimTransactionsData = useMemo(
    () =>
      unclaimedDrops.map((data, index) => {
        const id = getClaimXpTransactionID(data)
        return {
          id,
          title: `${index + 1}. Claim ${bigIntToDisplayUserAmount(
            data.claim.amount
          )} XP`,
          buttonLabel: "Claim XP",
          status: claimXpTransactionStatus[id],
          onClick: () => realmId && dispatch(claimXp({ id, claimData: data })),
        }
      }),
    [claimXpTransactionStatus, dispatch, realmId, unclaimedDrops]
  )

  return (
    <TransactionsModal
      title={
        <>
          Claiming{" "}
          <span style={{ color: "var(--primary-p2-100)", fontSize: "inherit" }}>
            {displayAmount} XP
          </span>
        </>
      }
      isOpen={isOpen}
      close={() => onClose()}
      transactions={claimTransactionsData}
    />
  )
}
