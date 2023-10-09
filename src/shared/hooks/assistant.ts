import { useEffect, useState } from "react"
import { LOCAL_STORAGE_ASSISTANT } from "shared/constants"

type Assistant = {
  type: "welcome" | "quests" | "default"
  visible: boolean
}

type UseAssistantReturn = {
  assistant: Assistant
  initializeAssistant: () => void
  closeAssistant: () => void
  toggleAssistant: () => void
  joinRegionAssistant: () => void
}

// Source: https://sabesh.hashnode.dev/update-components-based-on-localstorage-change-in-react-hooks
// eslint-disable-next-line import/prefer-default-export
export function useAssistant(): UseAssistantReturn {
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

  const initializeAssistant = () =>
    updateAssistant({ visible: true, type: "welcome" })

  const closeAssistant = () =>
    updateAssistant({ visible: false, type: "default" })

  const toggleAssistant = () => {
    updateAssistant({
      visible: !assistant.visible,
      type: "default",
    })
  }

  const joinRegionAssistant = () =>
    updateAssistant({ visible: true, type: "quests" })

  return {
    assistant,
    initializeAssistant,
    closeAssistant,
    toggleAssistant,
    joinRegionAssistant,
  }
}
