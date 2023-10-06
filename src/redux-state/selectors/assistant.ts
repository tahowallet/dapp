import { RootState } from "redux-state/reducers"

export const selectWelcomeAssistantVisible = (state: RootState) =>
  state.assistant.type === "welcome" && state.assistant.visible

export const selectQuestsAssistantVisible = (state: RootState) =>
  state.assistant.type === "quests" && state.assistant.visible

export const selectJoinAssistantVisible = (state: RootState) =>
  state.assistant.type === "default" && state.assistant.visible
