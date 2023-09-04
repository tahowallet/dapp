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
  eligibility: Eligibility
}

const initialState: ClaimState = {
  isLoading: false,
  name: "",
  address: "",
  hasClaimed: false,
  useConnectedWallet: true,
  eligibility: {
    account: "",
    amount: 0n,
    proof: null,
    index: null,
  },
}

const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    setClaimingUser: (immerState, { payload: { name, address } }) => {
      immerState.name = name
      immerState.address = address
    },
    setEligibility: (immerState, { payload: { eligibility } }) => {
      immerState.eligibility = eligibility
    },
    setHasClaimed: (immerState, { payload: { hasClaimed } }) => {
      immerState.hasClaimed = hasClaimed
    },
    resetClaiming: (immerState) => {
      immerState.name = ""
      immerState.address = ""
      immerState.hasClaimed = false
      immerState.eligibility = {
        account: "",
        amount: 0n,
        proof: null,
        index: null,
      }
    },
  },
})

export const { setClaimingUser, setEligibility, setHasClaimed, resetClaiming } =
  claimSlice.actions

export const selectClaimingUser = (state: { claim: ClaimState }) => ({
  name: state.claim.name,
  address: state.claim.address,
})

export const selectHasClaimed = (state: { claim: ClaimState }) =>
  state.claim.hasClaimed

export const selectEligibility = (state: { claim: ClaimState }) =>
  state.claim.eligibility

export const selectUseConnectedWalletToClaim = (state: { claim: ClaimState }) =>
  state.claim.useConnectedWallet

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

    const hasClaimed = await hasAlreadyClaimed(provider, eligibility)

    dispatch(setHasClaimed({ hasClaimed }))
  }
)
