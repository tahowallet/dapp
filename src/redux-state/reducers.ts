import { combineReducers } from "@reduxjs/toolkit"
import claimReducer from "./slices/claim"
import walletReducer from "./slices/wallet"
import mapReducer from "./slices/map"

const mainReducer = combineReducers({
  claim: claimReducer,
  wallet: walletReducer,
  map: mapReducer,
})

export type RootState = ReturnType<typeof mainReducer>

export default mainReducer
