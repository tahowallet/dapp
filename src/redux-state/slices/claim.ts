import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { hasAlreadyClaimed } from "shared/contracts"
import { Eligibility } from "shared/types"
import { getEligibility } from "shared/utils"

export type ClaimState = {
  isLoading: boolean // TODO: add loading effect to the UI
  name: string
  address: string
  hasClaimed: boolean
  useConnectedWallet: boolean
  eligibility: Eligibility | null
  stakeAmount: bigint | null
  regionAddress: string | null
  representativeAddress: string | null
}

const initialState: ClaimState = {
  isLoading: false, // TODO: implement loading effect
  name: "",
  address: "",
  hasClaimed: false,
  useConnectedWallet: true,
  eligibility: null,
  stakeAmount: null,
  regionAddress: null,
  representativeAddress: null,
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
    setRegionAddressToClaim: (
      immerState,
      {
        payload: { regionAddress },
      }: { payload: { regionAddress: string | null } }
    ) => {
      immerState.regionAddress = regionAddress
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
      immerState.regionAddress = null
      immerState.representativeAddress = null
    },
  },
})

export const {
  setClaimingUser,
  setEligibility,
  setHasClaimed,
  setUseConnectedWalletToClaim,
  setRegionAddressToClaim,
  setRepresentativeAddressToClaim,
  setStakeAmountToClaim,
  resetClaiming,
} = claimSlice.actions

export default claimSlice.reducer

export const fetchEligibility = createAsyncThunk(
  "claim/fetchEligibility",
  async (_, { dispatch, getState }) => {
    const {
      claim: { address },
    } = getState() as { claim: ClaimState }

    if (!address) {
      throw Error("No address to fetch eligibility for")
    }

    const eligibility = await getEligibility(address)

    dispatch(setEligibility({ eligibility }))
  }
)

export const fetchHasClaimed = createAsyncThunk(
  "claim/fetchHasClaimed",
  async (provider: ethers.providers.Provider, { dispatch, getState }) => {
    const {
      claim: { eligibility },
    } = getState() as { claim: ClaimState }

    const hasClaimed = eligibility
      ? await hasAlreadyClaimed(provider, eligibility)
      : false

    dispatch(setHasClaimed({ hasClaimed }))
  }
)
