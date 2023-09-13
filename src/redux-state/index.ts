import { configureStore, isPlain } from "@reduxjs/toolkit"
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"
import { encodeJSON } from "shared/utils"
import { TransactionService } from "shared/services"
import mainReducer from "./reducers"

const devToolsSanitizer = (input: unknown) => {
  switch (typeof input) {
    // We can make use of encodeJSON instead of recursively looping through
    // the input
    case "bigint":
    case "object":
      return JSON.parse(encodeJSON(input))
    // We only need to sanitize bigints and objects that may or may not contain
    // them.
    default:
      return input
  }
}

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { transactionService: TransactionService } },
      serializableCheck: {
        isSerializable: (value: unknown) =>
          isPlain(value) || typeof value === "bigint",
      },
    }),
  devTools: {
    actionSanitizer: devToolsSanitizer,
    stateSanitizer: devToolsSanitizer,
  },
  reducer: mainReducer,
})

export default store

export type DappDispatch = typeof store.dispatch

export const useDispatch: () => DappDispatch = useReduxDispatch
export const useSelector = useReduxSelector

export * from "./slices/claim"
export * from "./slices/wallet"
export * from "./slices/map"

export * from "./selectors/claim"
export * from "./selectors/wallet"
export * from "./selectors/map"
