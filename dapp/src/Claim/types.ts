import { ClaimState } from "./hooks"

export type Rule = {
  success: boolean
  label: string
  amount?: number
}

export type ClaimProps = {
  setClaimingAccount: React.Dispatch<React.SetStateAction<ClaimState>>
}
