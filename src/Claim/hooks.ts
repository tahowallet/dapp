import { createContext } from "react"
import { Eligibility } from "shared/types"

export type ClaimState = {
  userDetails: {
    isConnected: boolean
    name: string
    address: string
  }
  claimDetails: {
    isEligible: boolean
    hasClaimed: boolean
    eligibility: Eligibility
  }
}

export const DEFAULT_CLAIM_STATE: ClaimState = {
  userDetails: {
    isConnected: false,
    name: "",
    address: "",
  },
  claimDetails: {
    isEligible: false,
    hasClaimed: false,
    eligibility: {
      account: "",
      amount: 0n,
      proof: null,
      index: null,
    },
  },
}

export const ClaimContext = createContext<ClaimState>(DEFAULT_CLAIM_STATE)
