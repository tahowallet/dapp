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
  stakeUnlockTime: number | null
  displayedRealmId: string | null
}

const initialState: IslandState = {
  mode: "default",
  overlay: "none",
  realms: REALMS,
  stakingRealmId: null,
  stakeUnlockTime: null,
  displayedRealmId: null,
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
    setStakingUnlockTime: (
      immerState,
      { payload: stakeUnlockTime }: { payload: number | null }
    ) => {
      immerState.stakeUnlockTime = stakeUnlockTime
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
  setRealmContractData,
  setDisplayedRealmId,
  setStakingRealmId,
  setStakingUnlockTime,
} = islandSlice.actions

export default islandSlice.reducer
