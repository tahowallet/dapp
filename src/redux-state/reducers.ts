import { combineReducers } from "@reduxjs/toolkit"
import claimReducer from "./slices/claim"
import walletReducer from "./slices/wallet"

const mainReducer = combineReducers({
  claim: claimReducer,
  wallet: walletReducer,
})

export type RootState = ReturnType<typeof mainReducer>

export default mainReducer
