import { createSlice } from "@reduxjs/toolkit"
import { OverlayType, RegionContractData } from "shared/types"

// TODO: names and ids may change
const REALMS: { [id: string]: RegionContractData } = {
  "4": {
    name: "VAMPIRE_NODE",
    realmContractAddress: null,
  },
  "7": {
    name: "EDUCATE_NODE",
    realmContractAddress: null,
  },
  "9": {
    name: "SOCIAL_NODE",
    realmContractAddress: null,
  },
  "19": {
    name: "CREATORS_NODE",
    realmContractAddress: null,
  },
  "22": {
    name: "DEFI_NODE",
    realmContractAddress: null,
  },
}

type IslandModeType = "default" | "join-realm"

export type IslandState = {
  mode: IslandModeType
  overlay: OverlayType
  realms: { [id: string]: RegionContractData }
  stakingRegionId: string | null
  displayedRegionId: string | null
}

const initialState: IslandState = {
  mode: "default",
  overlay: "none",
  realms: REALMS,
  stakingRegionId: null,
  displayedRegionId: null,
}

const islandSlice = createSlice({
  name: "island",
  initialState,
  reducers: {
    setIslandMode: (
      immerState,
      { payload: mode }: { payload: IslandModeType }
    ) => {
      immerState.mode = mode
    },
    setIslandOverlay: (
      immerState,
      { payload: overlay }: { payload: OverlayType }
    ) => {
      immerState.overlay = overlay
    },
    setRegionAddresses: (
      immerState,
      {
        payload: realmAddresses,
      }: { payload: { id: string; address: string }[] }
    ) => {
      realmAddresses.forEach(({ id, address }) => {
        immerState.realms[id].realmContractAddress = address
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
    resetIsland: (immerState) => {
      immerState.mode = "default"
      immerState.overlay = "none"
    },
  },
})

export const {
  setIslandMode,
  setIslandOverlay,
  resetIsland,
  setRegionAddresses,
  setDisplayedRegionId,
} = islandSlice.actions

export default islandSlice.reducer
