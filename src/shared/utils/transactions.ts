import { CLAIM_XP_TX_ID_PREFIX } from "shared/constants"
import { TransactionProgressStatus, UnclaimedXpData } from "shared/types"

// eslint-disable-next-line import/prefer-default-export
export const isTransactionPending = (status: TransactionProgressStatus) =>
  status === TransactionProgressStatus.Approving ||
  status === TransactionProgressStatus.Approved ||
  status === TransactionProgressStatus.Signing ||
  status === TransactionProgressStatus.Sending

export const getAllowanceTransactionID = (id: string) => `${id}_allowance`

export const getClaimXpTransactionID = (data: UnclaimedXpData) =>
  `${CLAIM_XP_TX_ID_PREFIX}${data.merkleRoot}`

export const isClaimXpTransactionID = (id: string) =>
  id.startsWith(CLAIM_XP_TX_ID_PREFIX)

export const getAggregatedTransactionStatus = (
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
