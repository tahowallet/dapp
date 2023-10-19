import { LOCAL_STORAGE_ASSISTANT } from "shared/constants"
import { useLocalStorageChange } from "./storage"

type AssistantType = "welcome" | "quests" | "default"

type Assistant = {
  type: AssistantType
  visible: boolean
}

// eslint-disable-next-line import/prefer-default-export
export function useAssistant(): {
  assistant: Assistant | null
  updateAssistant: (newValue: Assistant) => void
  assistantVisible: (type: AssistantType) => boolean
} {
  const { value, updateStorage } = useLocalStorageChange<Assistant>(
    LOCAL_STORAGE_ASSISTANT
  )

  const assistantVisible = (type: AssistantType): boolean =>
    value ? value.visible && value.type === type : false

  return { assistant: value, updateAssistant: updateStorage, assistantVisible }
}
