import { createSlice } from "@reduxjs/toolkit"

type AssistantState = {
  welcomePopup: { closed: boolean }
  questsPopup: { staked: boolean; closed: boolean }
  visible: boolean
}

const initialState: AssistantState = {
  welcomePopup: { closed: false },
  questsPopup: { staked: false, closed: false },
  visible: true,
}

const assistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    closeWelcomeAssistant: (immerState) => {
      immerState.welcomePopup.closed = true
      immerState.visible = false
    },
    closeQuestsAssistant: (immerState) => {
      immerState.questsPopup.closed = true
      immerState.visible = false
    },
    joinRegionAssistant: (immerState) => {
      immerState.questsPopup = { closed: false, staked: true }
      immerState.visible = true
    },
    closeAssistant: (immerState) => {
      immerState.visible = false
    },
    toggleAssistant: (immerState) => {
      if (!immerState.welcomePopup.closed) {
        immerState.welcomePopup.closed = true
        immerState.visible = false
      } else if (
        immerState.questsPopup.staked &&
        !immerState.questsPopup.closed
      ) {
        immerState.questsPopup.closed = true
        immerState.visible = false
      } else {
        immerState.visible = !immerState.visible
      }
    },
  },
})

export const {
  closeWelcomeAssistant,
  closeQuestsAssistant,
  joinRegionAssistant,
  closeAssistant,
  toggleAssistant,
} = assistantSlice.actions

export default assistantSlice.reducer
