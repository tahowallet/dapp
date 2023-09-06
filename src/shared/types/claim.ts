export type Eligibility = {
  account: string
  amount: bigint
  index: bigint | null
  proof: string[] | null
}

export enum TransactionProgressStatus {
  Idle,
  Signing,
  Broadcasting,
  Mining,
  Done,
}
