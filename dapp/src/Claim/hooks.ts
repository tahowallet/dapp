import { createContext } from "react"
import { Eligibility } from "../shared/types"

export type ClaimState = {
  userDetails: {
    isConnected: boolean
    name: string
    address: string
  }
  claimDetails: {
    isEligible: boolean
    amount: number
    rawAmount: bigint
  } & Pick<Eligibility, "proof" | "index">
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
    rawAmount: 0n,
    proof: null,
    index: null,
  },
}

export const ClaimContext = createContext<ClaimState>(DEFAULT_CLAIM_STATE)
