import { createContext } from "react"

export type ClaimState = {
  userDetails: {
    isConnected: boolean
    name: string
    address: string
  }
  claimDetails: {
    isEligible: boolean
    amount: number
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
    amount: 0,
  },
}

export const ClaimContext = createContext<ClaimState>(DEFAULT_CLAIM_STATE)
