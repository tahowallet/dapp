import { configureStore, isPlain } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { encodeJSON } from "shared/utils"
import { TransactionService } from "shared/services"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
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

export const thunkExtraArgument = { transactionService: TransactionService }

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: thunkExtraArgument },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
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

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export default store
