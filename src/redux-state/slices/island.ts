import { createSlice } from "@reduxjs/toolkit"
import { OverlayType, RealmContractData } from "shared/types"

// TODO: names and ids may change
const REALMS: { [id: string]: RealmContractData } = {
  "4": {
    name: "VAMPIRE_REALM",
    realmContractAddress: null,
    veTokenContractAddress: null,
  },
  "7": {
    name: "EDUCATE_REALM",
    realmContractAddress: null,
    veTokenContractAddress: null,
  },
  "9": {
    name: "SOCIAL_REALM",
    realmContractAddress: null,
    veTokenContractAddress: null,
  },
  "19": {
    name: "CREATORS_REALM",
    realmContractAddress: null,
    veTokenContractAddress: null,
  },
  "22": {
    name: "DEFI_REALM",
    realmContractAddress: null,
    veTokenContractAddress: null,
  },
}

type IslandModeType = "default" | "join-realm"

export type IslandState = {
  mode: IslandModeType
  overlay: OverlayType
  realms: { [id: string]: RealmContractData }
  stakingRealmId: string | null
  displayedRealmId: string | null
  zoomLevel: number
}

const initialState: IslandState = {
  mode: "default",
  overlay: "dark",
  realms: REALMS,
  stakingRealmId: null,
  displayedRealmId: null,
  zoomLevel: 1,
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
    setIslandZoomLevel: (
      immerState,
      { payload: zoomLevel }: { payload: number }
    ) => {
      immerState.zoomLevel = zoomLevel
    },
    setRealmContractData: (
      immerState,
      {
        payload: realmAddresses,
      }: { payload: { id: string; address: string; veTokenAddress: string }[] }
    ) => {
      realmAddresses.forEach(({ id, address, veTokenAddress }) => {
        immerState.realms[id].realmContractAddress = address
        immerState.realms[id].veTokenContractAddress = veTokenAddress
      })
    },
    setStakingRealmId: (
      immerState,
      { payload: stakingRealmId }: { payload: string | null }
    ) => {
      immerState.stakingRealmId = stakingRealmId
    },
    setDisplayedRealmId: (
      immerState,
      { payload: displayedRealmId }: { payload: string | null }
    ) => {
      immerState.displayedRealmId = displayedRealmId
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
  setIslandZoomLevel,
  resetIsland,
  setRealmContractData,
  setDisplayedRealmId,
  setStakingRealmId,
} = islandSlice.actions

export default islandSlice.reducer
