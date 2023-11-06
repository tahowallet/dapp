import React, { useCallback, useEffect, useMemo, useState } from "react"

import {
  useDappDispatch,
  useDappSelector,
  selectDisplayedRealmId,
  claimXp,
  selectUnclaimedXpById,
  selectXpClaimTransactionStatuses,
  stopTrackingClaimTransactions,
  selectRealmById,
} from "redux-state"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { useTransactionSuccessCallback } from "shared/hooks"
import {
  bigIntToDisplayUserAmount,
  getAggregatedTransactionStatus,
  getClaimXpTransactionID,
} from "shared/utils"

export default function XpClaimModal({
  isOpen,
  displayAmount,
  onClaim,
  onClose,
}: {
  isOpen: boolean
  // displayAmount - it is already parsed to be displayed,
  // constant amount that won't be changed after each claim
  displayAmount: string
  onClaim: () => void
  onClose: () => void
}) {
  const dispatch = useDappDispatch()
  const realmId = useDappSelector(selectDisplayedRealmId)
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  const unclaimedDrops = useDappSelector((state) =>
    realmId ? selectUnclaimedXpById(state, realmId) : []
  )
  const [savedUnclaimedDrops] = useState(() => unclaimedDrops)

  const claimXpTransactionStatus = useDappSelector((state) =>
    selectXpClaimTransactionStatuses(state, savedUnclaimedDrops)
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
      savedUnclaimedDrops.map((data, index) => {
        const id = getClaimXpTransactionID(data)
        return {
          id,
          title: `${index + 1}. Claim ${bigIntToDisplayUserAmount(
            data.claim.amount
          )} XP`,
          buttonLabel: "Claim XP",
          status: claimXpTransactionStatus[id],
          onClick: () =>
            realmId && dispatch(claimXp({ id, unclaimedXpData: data })),
        }
      }),
    [claimXpTransactionStatus, dispatch, realmId, savedUnclaimedDrops]
  )

  return (
    <TransactionsModal
      title={
        <>
          Claiming{" "}
          <span style={{ color: "var(--primary-p2-100)", fontSize: "inherit" }}>
            {displayAmount} {realm?.xpToken.symbol}
          </span>
        </>
      }
      isOpen={isOpen}
      close={onClose}
      transactions={claimTransactionsData}
    />
  )
}
