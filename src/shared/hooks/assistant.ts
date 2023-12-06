import { LOCAL_STORAGE_ASSISTANT } from "shared/constants"
import { selectStakingRealmId, useDappSelector } from "redux-state"
import { useLocalStorageChange } from "./helpers"

type AssistantType = "welcome" | "challenges" | "default" | "first-realm"

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
  const isStakedInRealm = useDappSelector(selectStakingRealmId)

  const { value, updateStorage } = useLocalStorageChange<Assistant>(
    LOCAL_STORAGE_ASSISTANT
  )

  const assistantVisible = (type: AssistantType): boolean => {
    if ((type === "welcome" || type === "first-realm") && isStakedInRealm)
      return false
    return value ? value.visible && value.type === type : false
  }

  return { assistant: value, updateAssistant: updateStorage, assistantVisible }
}
