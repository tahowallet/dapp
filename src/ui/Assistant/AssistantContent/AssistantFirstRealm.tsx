import React from "react"
import { useAssistant, useLocalStorageChange } from "shared/hooks"
import { LOCAL_STORAGE_VISITED_REALM } from "shared/constants"
import AssistantContent from "."

export default function AssistantFirstRealm() {
  const { updateAssistant, assistantVisible } = useAssistant()
  const { updateStorage } = useLocalStorageChange<boolean>(
    LOCAL_STORAGE_VISITED_REALM
  )

  const closeAssistant = () => {
    updateStorage(true)
    updateAssistant({ visible: false, type: "default" })
  }

  return (
    <>
      <AssistantContent
        isVisible={assistantVisible("first-realm")}
        close={closeAssistant}
      >
        <div className="header">How to choose a realm?</div>
        <p className="paragraph">
          Rewards are shared based on population and Quest completion.
        </p>
        <p className="paragraph">
          So choose your realm based on quests you want and can complete.
        </p>
        <p className="paragraph" style={{ marginBottom: 0 }}>
          But also be mind-full, that a popular realm might yield less
          individual rewards
        </p>
      </AssistantContent>
      <style jsx>{`
        .header {
          font: var(--text-h1);
          margin-bottom: 8px;
        }
        .paragraph {
          color: var(--secondary-s1-80);
          margin-bottom: 24px;
        }
      `}</style>
    </>
  )
}
