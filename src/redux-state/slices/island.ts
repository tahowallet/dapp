import { createSlice } from "@reduxjs/toolkit"
import { OverlayType, RealmData, RealmDataWithId } from "shared/types"
import { ASSISTANT } from "shared/constants"

type IslandModeType = "default" | "join-realm"

type Assistant = {
  welcomePopup: { closed: boolean }
  questsPopup: { staked: boolean; closed: boolean }
  visible: boolean
}

type AssistantPayload =
  | "close-welcome"
  | "join-region"
  | "close-quests"
  | "toggle-popup"
  | "close-popup"

export type IslandState = {
  mode: IslandModeType
  overlay: OverlayType
  realms: { [id: string]: RealmData }
  stakingRealmId: string | null
  stakeUnlockTime: number | null
  displayedRealmId: string | null
  zoomLevel: number
  assistant: Assistant
}

const initialAssistantState: Assistant = {
  welcomePopup: { closed: false },
  questsPopup: { staked: false, closed: false },
  visible: true,
}

const initialState: IslandState = {
  mode: "default",
  overlay: "dark",
  realms: {},
  stakingRealmId: null,
  stakeUnlockTime: null,
  displayedRealmId: null,
  zoomLevel: 1,
  assistant: localStorage.getItem(ASSISTANT)
    ? JSON.parse(localStorage.getItem(ASSISTANT)!)
    : initialAssistantState,
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
    setAssistant: (immerState, { payload }: { payload: AssistantPayload }) => {
      let updatedAssistant = {} // TODO: adjust types

      // eslint-disable-next-line default-case
      switch (payload) {
        case "close-welcome":
          updatedAssistant = { welcomePopup: { closed: true }, visible: false }
          break
        case "close-quests":
          updatedAssistant = {
            questsPopup: {
              closed: true,
              staked: immerState.assistant.questsPopup.staked,
            },
            visible: false,
          }
          break
        case "join-region":
          updatedAssistant = {
            welcomePopup: { closed: true },
            questsPopup: { closed: false, staked: true },
            visible: true,
          }
          break
        case "toggle-popup":
          updatedAssistant = { visible: !immerState.assistant.visible }
          break
        case "close-popup":
          updatedAssistant = { visible: false }
          break
      }

      immerState.assistant = {
        ...immerState.assistant,
        ...updatedAssistant,
      }

      localStorage.setItem(ASSISTANT, JSON.stringify(immerState.assistant))
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
  setRealmPopulation,
  setRealmsData,
  setDisplayedRealmId,
  setStakingRealmId,
  setStakingUnlockTime,
  setAssistant,
} = islandSlice.actions

export default islandSlice.reducer
