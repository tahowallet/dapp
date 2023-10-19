import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer"
import { encodeJSON, decodeJSON } from "shared/utils"
import { LOCAL_STORAGE_CACHE_ISLAND } from "shared/constants"
import claimReducer from "./slices/claim"
import walletReducer from "./slices/wallet"
import islandReducer from "./slices/island"

const persistTransform = {
  in: (state: unknown) => encodeJSON(state),
  out: (state: string) => decodeJSON(state),
}

const islandPersistConfig = {
  key: LOCAL_STORAGE_CACHE_ISLAND,
  storage,
  whitelist: ["seasonInfo", "stakingRealmId", "realms"], // only store these properties from redux
  transforms: [persistTransform],
}

const mainReducer = combineReducers({
  claim: claimReducer,
  wallet: walletReducer,
  island: persistReducer(islandPersistConfig, islandReducer),
})

export type RootState = ReturnType<typeof mainReducer>

export default mainReducer
