import { createSlice } from "@reduxjs/toolkit"
import { Eligibility } from "shared/types"

export type ClaimState = {
  isLoading: boolean // TODO: add loading effect to the UI
  name: string
  address: string
  hasClaimed: boolean
  useConnectedWallet: boolean
  eligibility: Eligibility | null
  stakeAmount: bigint | null
  representativeAddress: string | null
  selectedRealmId: string | null
}

const initialState: ClaimState = {
  isLoading: false, // TODO: implement loading effect
  name: "",
  address: "",
  hasClaimed: false,
  useConnectedWallet: true,
  eligibility: null,
  stakeAmount: null,
  representativeAddress: null,
  selectedRealmId: null,
}

const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    setClaimingUser: (
      immerState,
      {
        payload: { name, address },
      }: { payload: { name?: string; address?: string } }
    ) => {
      immerState.name = name || immerState.name
      immerState.address = address || immerState.address
    },
    setEligibility: (
      immerState,
      {
        payload: { eligibility },
      }: { payload: { eligibility: Eligibility | null } }
    ) => {
      immerState.eligibility = eligibility
    },
    setHasClaimed: (
      immerState,
      { payload: { hasClaimed } }: { payload: { hasClaimed: boolean } }
    ) => {
      immerState.hasClaimed = hasClaimed
    },
    setUseConnectedWalletToClaim: (
      immerState,
      {
        payload: { useConnectedWallet },
      }: { payload: { useConnectedWallet: boolean } }
    ) => {
      immerState.useConnectedWallet = useConnectedWallet
    },
    setRepresentativeAddressToClaim: (
      immerState,
      {
        payload: { representativeAddress },
      }: { payload: { representativeAddress: string | null } }
    ) => {
      immerState.representativeAddress = representativeAddress
    },
    setStakeAmountToClaim: (
      immerState,
      { payload: { stakeAmount } }: { payload: { stakeAmount: bigint | null } }
    ) => {
      immerState.stakeAmount = stakeAmount
    },
    resetClaiming: (immerState) => {
      immerState.name = ""
      immerState.address = ""
      immerState.hasClaimed = false
      immerState.eligibility = null
      immerState.stakeAmount = null
      immerState.representativeAddress = null
      immerState.selectedRealmId = null
    },
    setSelectedRealmId: (immerState, { payload: id }: { payload: string }) => {
      immerState.selectedRealmId = id
    },
  },
})

export const {
  setClaimingUser,
  setEligibility,
  setHasClaimed,
  setUseConnectedWalletToClaim,
  setRepresentativeAddressToClaim,
  setStakeAmountToClaim,
  resetClaiming,
  setSelectedRealmId,
} = claimSlice.actions

export default claimSlice.reducer
