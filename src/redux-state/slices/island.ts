import { createSlice } from "@reduxjs/toolkit"
import {
  LeaderboardData,
  UnclaimedXpData,
  OverlayType,
  RealmDataWithId,
  SeasonInfo,
  RealmDataById,
} from "shared/types"

export type IslandModeType = "default" | "join-realm"

export type IslandState = {
  mode: IslandModeType
  overlay: OverlayType
  realms: RealmDataById
  leaderboards: { [id: string]: LeaderboardData }
  unclaimedXp: { [id: string]: UnclaimedXpData[] }
  stakingRealmId: string | null
  stakeUnlockTime: number | null
  displayedRealmId: string | null
  zoomLevel: number
  seasonInfo: SeasonInfo | null
  realmPanelVisible: boolean
}

const initialState: IslandState = {
  mode: "default",
  overlay: "dark",
  realms: {},
  leaderboards: {},
  unclaimedXp: {},
  stakingRealmId: null,
  stakeUnlockTime: null,
  displayedRealmId: null,
  zoomLevel: 1,
  seasonInfo: null,
  realmPanelVisible: false,
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
    setRealmDisplayedPopulation: (
      immerState,
      {
        payload: realmPopulation,
      }: { payload: { id: string; population: number } }
    ) => {
      immerState.realms[realmPopulation.id].displayedPopulation =
        realmPopulation.population
    },
    setRealmXpAllocatable: (
      immerState,
      {
        payload: realmXpAllocatable,
      }: { payload: { id: string; xpAllocatable: string } }
    ) => {
      immerState.realms[realmXpAllocatable.id].xpAllocatable =
        realmXpAllocatable.xpAllocatable
    },
    setRealmPanelVisible: (
      immerState,
      { payload: realmPanelVisible }: { payload: boolean }
    ) => {
      immerState.realmPanelVisible = realmPanelVisible
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
    setLeaderboardData: (
      immerState,
      { payload }: { payload: { id: string; data: LeaderboardData } }
    ) => {
      immerState.leaderboards[payload.id] = payload.data
    },
    setUnclaimedXpData: (
      immerState,
      { payload }: { payload: { id: string; data: UnclaimedXpData[] } }
    ) => {
      immerState.unclaimedXp[payload.id] = payload.data
    },
    setSeasonInfo: (
      immerState,
      { payload: seasonInfo }: { payload: SeasonInfo }
    ) => {
      immerState.seasonInfo = seasonInfo
    },
    resetIslandDisplay: (immerState) => {
      immerState.mode = "default"
      immerState.overlay = "dark"
    },
    resetIslandAccount: (immerState) => {
      immerState.stakingRealmId = null
      immerState.stakeUnlockTime = null
      immerState.unclaimedXp = {}
    },
  },
})

export const {
  setIslandMode,
  setIslandOverlay,
  setIslandZoomLevel,
  resetIslandDisplay,
  resetIslandAccount,
  setRealmPopulation,
  setRealmDisplayedPopulation,
  setRealmXpAllocatable,
  setRealmsData,
  setRealmPanelVisible,
  setDisplayedRealmId,
  setStakingRealmId,
  setStakingUnlockTime,
  setLeaderboardData,
  setUnclaimedXpData,
  setSeasonInfo,
} = islandSlice.actions

export default islandSlice.reducer
