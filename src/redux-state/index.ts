import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"
import store from "./store"

export type DappDispatch = typeof store.dispatch

export const useDappDispatch: () => DappDispatch = useReduxDispatch
export const useDappSelector = useReduxSelector

export default store

export * from "./thunks/claim"
export * from "./thunks/wallet"

export * from "./slices/claim"
export * from "./slices/wallet"
export * from "./slices/map"

export * from "./selectors/claim"
export * from "./selectors/wallet"
export * from "./selectors/map"
