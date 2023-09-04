import { configureStore, isPlain } from "@reduxjs/toolkit"
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"
import claimReducer from "./slices/claim"
import walletReducer from "./slices/wallet"

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        isSerializable: (value: unknown) =>
          isPlain(value) || typeof value === "bigint",
      },
    }),
  reducer: {
    claim: claimReducer,
    wallet: walletReducer,
  },
})

export default store

export type DappDispatch = typeof store.dispatch

export const useDispatch: () => DappDispatch = useReduxDispatch
export const useSelector = useReduxSelector

export * from "./slices/claim"
export * from "./slices/wallet"
