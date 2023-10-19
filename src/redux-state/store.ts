import { configureStore, isPlain } from "@reduxjs/toolkit"
import { encodeJSON } from "shared/utils"
import { StorageService, TransactionService } from "shared/services"
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

export const thunkExtraArgument = {
  transactionService: TransactionService,
  storageService: StorageService,
}

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: thunkExtraArgument },
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
