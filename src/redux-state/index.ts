import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux"
import store from "./store"

import "./events"

export type DappDispatch = typeof store.dispatch

export const useDappDispatch: () => DappDispatch = useReduxDispatch
export const useDappSelector = useReduxSelector

export default store

export * from "./thunks/claim"
export * from "./thunks/wallet"
export * from "./thunks/lp"
export * from "./thunks/island"

export * from "./slices/claim"
export * from "./slices/wallet"
export * from "./slices/island"

export * from "./selectors/claim"
export * from "./selectors/island"
export * from "./selectors/leaderboard"
export * from "./selectors/population"
export * from "./selectors/challenge"
export * from "./selectors/realm"
export * from "./selectors/season"
export * from "./selectors/staking"
export * from "./selectors/token"
export * from "./selectors/wallet"
export * from "./selectors/xp"
