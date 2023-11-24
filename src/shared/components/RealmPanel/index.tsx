import React, { useEffect } from "react"
import { useAssistant, useLocalStorageChange } from "shared/hooks"
import { LOCAL_STORAGE_VISITED_REALM } from "shared/constants"
import closeIcon from "shared/assets/icons/s/close.svg"
import Panel from "../Panel"
import Button from "../Button"

export default function RealmPanel({ onClose }: { onClose: () => void }) {
  const { updateAssistant } = useAssistant()
  const { value, updateStorage } = useLocalStorageChange<boolean>(
    LOCAL_STORAGE_VISITED_REALM
  )

  useEffect(() => {
    if (value) return
    updateStorage(true)
    updateAssistant({ visible: true, type: "first-realm" })
  }, [value, updateStorage, updateAssistant])

  return (
    <>
      <Panel />
      <Button
        size="medium"
        iconSrc={closeIcon}
        iconPosition="left"
        onClick={onClose}
        style={{
          position: "absolute",
          bottom: 160,
          left: "calc(50% - 100px)",
        }}
      >
        Close view
      </Button>
      <Panel />
    </>
  )
}
