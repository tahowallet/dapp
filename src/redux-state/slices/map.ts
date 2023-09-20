import { createSlice } from "@reduxjs/toolkit"
import { OverlayType, RegionContractData } from "shared/types"

// TODO: names and ids may change
const REGIONS: { [id: string]: RegionContractData } = {
  "4": {
    name: "VAMPIRE_NODE",
    regionContractAddress: null,
    veTokenContractAddress: null,
  },
  "7": {
    name: "EDUCATE_NODE",
    regionContractAddress: null,
    veTokenContractAddress: null,
  },
  "9": {
    name: "SOCIAL_NODE",
    regionContractAddress: null,
    veTokenContractAddress: null,
  },
  "19": {
    name: "CREATORS_NODE",
    regionContractAddress: null,
    veTokenContractAddress: null,
  },
  "22": {
    name: "DEFI_NODE",
    regionContractAddress: null,
    veTokenContractAddress: null,
  },
}

type MapModeType = "default" | "join-region"

export type MapState = {
  mode: MapModeType
  overlay: OverlayType
  regions: { [id: string]: RegionContractData }
  stakingRegionId: string | null
  displayedRegionId: string | null
}

const initialState: MapState = {
  mode: "default",
  overlay: "none",
  regions: REGIONS,
  stakingRegionId: null,
  displayedRegionId: null,
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
      }: { payload: { id: string; address: string; veTokenAddress: string }[] }
    ) => {
      regionAddresses.forEach(({ id, address, veTokenAddress }) => {
        immerState.regions[id].regionContractAddress = address
        immerState.regions[id].veTokenContractAddress = veTokenAddress
      })
    },
    setStakingRegionId: (
      immerState,
      { payload: stakingRegionId }: { payload: string | null }
    ) => {
      immerState.stakingRegionId = stakingRegionId
    },
    setDisplayedRegionId: (
      immerState,
      { payload: displayedRegionId }: { payload: string | null }
    ) => {
      immerState.displayedRegionId = displayedRegionId
    },
    resetMap: (immerState) => {
      immerState.mode = "default"
      immerState.overlay = "none"
    },
  },
})

export const {
  setMapMode,
  setMapOverlay,
  resetMap,
  setRegionAddresses,
  setDisplayedRegionId,
} = mapSlice.actions

export default mapSlice.reducer
