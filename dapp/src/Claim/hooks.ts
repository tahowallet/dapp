import { createContext } from "react"

export type ClaimState = {
  userDetails: {
    isConnected: boolean
    name: string
    address: string
  }
}

export const DEFAULT_CLAIM_STATE: ClaimState = {
  userDetails: {
    isConnected: false,
    name: "",
    address: "",
  },
}

export const ClaimContext = createContext<ClaimState>(DEFAULT_CLAIM_STATE)
