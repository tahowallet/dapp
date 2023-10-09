import { combineReducers } from "@reduxjs/toolkit"
import claimReducer from "./slices/claim"
import walletReducer from "./slices/wallet"
import islandReducer from "./slices/island"

const mainReducer = combineReducers({
  claim: claimReducer,
  wallet: walletReducer,
  island: islandReducer,
})

export type RootState = ReturnType<typeof mainReducer>

export default mainReducer
