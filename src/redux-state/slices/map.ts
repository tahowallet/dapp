import { createSlice } from "@reduxjs/toolkit"
import { OverlayType } from "Map/Background"

type MapModeType = "default" | "join-region"

export type MapState = {
  mode: MapModeType
  overlay: OverlayType
}

const initialState: MapState = {
  mode: "default",
  overlay: "none",
}

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapMode: (immerState, { payload: mode }: { payload: MapModeType }) => {
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
