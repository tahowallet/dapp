import { createSlice } from "@reduxjs/toolkit"
import { OverlayType } from "Map/Background"

export type MapState = {
  mode: "default" | "join-region"
  overlay: OverlayType
}

const initialState: MapState = {
  mode: "default",
  overlay: "none",
}

const mapSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    setMapMode: (
      immerState,
      { payload: mode }: { payload: "default" | "join-region" }
    ) => {
      immerState.mode = mode
    },
    setMapOverlay: (
      immerState,
      { payload: overlay }: { payload: OverlayType }
    ) => {
      immerState.overlay = overlay
    },
  },
})

export const { setMapMode, setMapOverlay } = mapSlice.actions

export default mapSlice.reducer
