export type Eligibility = {
  account: string
  amount: bigint
  index: bigint | null
  proof: string[] | null
}

export type ClaimJourneyStatus =
  | "not-started"
  | "pledge"
  | "region"
  | "claim"
  | "done"
