import { useEffect, useState } from "react"
import { LOCAL_STORAGE_ASSISTANT } from "shared/constants"

type AssistantType = "welcome" | "quests" | "default"

type Assistant = {
  type: AssistantType
  visible: boolean
}

// Source: https://sabesh.hashnode.dev/update-components-based-on-localstorage-change-in-react-hooks
// eslint-disable-next-line import/prefer-default-export
export function useAssistant(): {
  assistant: Assistant
  updateAssistant: (newValue: Assistant) => void
  assistantVisible: (type: AssistantType) => boolean
} {
  const initialValue = localStorage.getItem(LOCAL_STORAGE_ASSISTANT) || null
  const [assistant, setAssistant] = useState(
    initialValue ? JSON.parse(initialValue) : null
  )

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== LOCAL_STORAGE_ASSISTANT) return
      setAssistant(e.newValue ? JSON.parse(e.newValue) : null)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  })

  const updateAssistant = (newValue: Partial<Assistant>) => {
    window.localStorage.setItem(
      LOCAL_STORAGE_ASSISTANT,
      JSON.stringify(newValue)
    )

    const event = new StorageEvent("storage", {
      key: LOCAL_STORAGE_ASSISTANT,
      newValue: JSON.stringify(newValue),
    })

    window.dispatchEvent(event)
  }

  const assistantVisible = (type: AssistantType) =>
    assistant.visible && assistant.type === type

  return { assistant, updateAssistant, assistantVisible }
}
