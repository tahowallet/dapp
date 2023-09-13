import { ethers } from "ethers"
import { getEligibility } from "shared/utils"
import { setEligibility, setHasClaimed } from "redux-state/slices/claim"
import { hasAlreadyClaimed } from "shared/contracts"
import createDappAsyncThunk from "../asyncThunk"

export const fetchEligibility = createDappAsyncThunk(
  "claim/fetchEligibility",
  async (_, { dispatch, getState }) => {
    const {
      claim: { address },
    } = getState()

    if (!address) {
      throw Error("No address to fetch eligibility for")
    }

    const eligibility = await getEligibility(address)

    dispatch(setEligibility({ eligibility }))
  }
)

export const fetchHasClaimed = createDappAsyncThunk(
  "claim/fetchHasClaimed",
  async (provider: ethers.providers.Provider, { dispatch, getState }) => {
    const {
      claim: { eligibility },
    } = getState()

    const hasClaimed = eligibility
      ? await hasAlreadyClaimed(provider, eligibility)
      : false

    dispatch(setHasClaimed({ hasClaimed }))
  }
)
