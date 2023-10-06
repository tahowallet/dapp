import { createSlice } from "@reduxjs/toolkit"

type AssistantState = {
  type: "welcome" | "quests" | "default"
  visible: boolean
}

const initialState: AssistantState = {
  type: "welcome",
  visible: true,
}

const assistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    joinRegionAssistant: (immerState) => {
      immerState.type = "quests"
      immerState.visible = true
    },
    closeAssistant: (immerState) => {
      immerState.type = "default"
      immerState.visible = false
    },
    toggleAssistant: (immerState) => {
      immerState.type = "default"
      immerState.visible = !immerState.visible
    },
  },
})

export const { joinRegionAssistant, closeAssistant, toggleAssistant } =
  assistantSlice.actions

export default assistantSlice.reducer
