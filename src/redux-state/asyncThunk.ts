import { createAsyncThunk } from "@reduxjs/toolkit"
import store, { thunkExtraArgument } from "redux-state/store"

type DappDispatch = typeof store.dispatch
type DappState = ReturnType<typeof store.getState>
type DappExtra = typeof thunkExtraArgument

const createDappAsyncThunk = createAsyncThunk.withTypes<{
  state: DappState
  dispatch: DappDispatch
  extra: DappExtra
}>()

export default createDappAsyncThunk
