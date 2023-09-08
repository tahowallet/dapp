import { createSlice } from "@reduxjs/toolkit"
import { OverlayType } from "Map/Background"
import { RegionContractData } from "shared/types/map"

// TODO: names and ids may change
const REGIONS: { [id: string]: RegionContractData } = {
  "4": {
    name: "VAMPIRE_NODE",
    regionAddress: null,
    veTokenAddress: CONTRACT_VampireNodeVeTaho,
  },
  "7": {
    name: "EDUCATE_NODE",
    regionAddress: null,
    veTokenAddress: CONTRACT_EducateNodeVeTaho,
  },
  "9": {
    name: "SOCIAL_NODE",
    regionAddress: null,
    veTokenAddress: CONTRACT_SocialNodeVeTaho,
  },
  "19": {
    name: "CREATORS_NODE",
    regionAddress: null,
    veTokenAddress: CONTRACT_CreatorsNodeVeTaho,
  },
  "22": {
    name: "DEFI_NODE",
    regionAddress: null,
    veTokenAddress: CONTRACT_DeFiNodeVeTaho,
  },
}

type MapModeType = "default" | "join-region"

export type MapState = {
  mode: MapModeType
  overlay: OverlayType
  regions: { [id: string]: RegionContractData }
}

const initialState: MapState = {
  mode: "default",
  overlay: "none",
  regions: REGIONS,
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
    setRegionAddresses: (
      immerState,
      {
        payload: regionAddresses,
      }: { payload: { id: string; address: string }[] }
    ) => {
      regionAddresses.forEach(({ id, address }) => {
        immerState.regions[id].regionAddress = address
      })
    },
  },
})

export const { setMapMode, setMapOverlay, setRegionAddresses } =
  mapSlice.actions

export default mapSlice.reducer
