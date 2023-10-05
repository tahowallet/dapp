import { RootState } from "redux-state/reducers"

export const selectWelcomeAssistantVisible = (state: RootState) =>
  !state.assistant.welcomePopup.closed && state.assistant.visible

export const selectQuestsAssistantVisible = (state: RootState) =>
  state.assistant.questsPopup.staked &&
  !state.assistant.questsPopup.closed &&
  state.assistant.visible

export const selectJoinAssistantVisible = (state: RootState) =>
  state.assistant.welcomePopup.closed &&
  state.assistant.questsPopup.closed &&
  state.assistant.visible
