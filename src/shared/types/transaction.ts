export enum TransactionProgressStatus {
  Idle,
  Signing,
  Sending,
  Done,
}

export type Transaction = {
  status: TransactionProgressStatus
}
