import { TransactionProgressStatus } from "shared/types"

// eslint-disable-next-line import/prefer-default-export
export const isTransactionPending = (status: TransactionProgressStatus) =>
  status === TransactionProgressStatus.Approving ||
  status === TransactionProgressStatus.Approved ||
  status === TransactionProgressStatus.Signing ||
  status === TransactionProgressStatus.Sending

export const getAllowanceTransactionID = (id: string) => `${id}_allowance`
