import { createSlice } from "@reduxjs/toolkit"
import {
  OverlayType,
  RealmData,
  RealmDataWithId,
  SeasonInfo,
} from "shared/types"

type IslandModeType = "default" | "join-realm"

export type IslandState = {
  mode: IslandModeType
  overlay: OverlayType
  realms: { [id: string]: RealmData }
  stakingRealmId: string | null
  stakeUnlockTime: number | null
  displayedRealmId: string | null
  zoomLevel: number
  seasonInfo: SeasonInfo | null
}

const initialState: IslandState = {
  mode: "default",
  overlay: "dark",
  realms: {},
  stakingRealmId: null,
  stakeUnlockTime: null,
  displayedRealmId: null,
  zoomLevel: 1,
  seasonInfo: null,
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
    setRealmsData: (
      immerState,
      { payload: realmData }: { payload: RealmDataWithId[] }
    ) => {
      realmData.forEach(({ id, data }) => {
        immerState.realms[id] = data
      })
    },
    setRealmPopulation: (
      immerState,
      {
        payload: realmPopulation,
      }: { payload: { id: string; population: number } }
    ) => {
      immerState.realms[realmPopulation.id].population =
        realmPopulation.population
    },
    setRealmXpAllocatable: (
      immerState,
      {
        payload: realmXpAllocatable,
      }: { payload: { id: string; xpAllocatable: bigint } }
    ) => {
      immerState.realms[realmXpAllocatable.id].xpAllocatable =
        realmXpAllocatable.xpAllocatable
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
    setSeasonInfo: (
      immerState,
      { payload: seasonInfo }: { payload: SeasonInfo }
    ) => {
      immerState.seasonInfo = seasonInfo
    },
    resetIsland: (immerState) => {
      immerState.mode = "default"
      immerState.overlay = "dark"
    },
  },
})

export const {
  setIslandMode,
  setIslandOverlay,
  setIslandZoomLevel,
  resetIsland,
  setRealmPopulation,
  setRealmXpAllocatable,
  setRealmsData,
  setDisplayedRealmId,
  setStakingRealmId,
  setStakingUnlockTime,
  setSeasonInfo,
} = islandSlice.actions

export default islandSlice.reducer
