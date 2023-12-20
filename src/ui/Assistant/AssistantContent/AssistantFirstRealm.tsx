import React from "react"
import { useAssistant, useLocalStorageChange } from "shared/hooks"
import { LOCAL_STORAGE_VISITED_REALM } from "shared/constants"
import { selectNumberOfRealms, useDappSelector } from "redux-state"
import AssistantContent from "."

export default function AssistantFirstRealm() {
  const { updateAssistant, assistantVisible } = useAssistant()
  const { updateStorage } = useLocalStorageChange<boolean>(
    LOCAL_STORAGE_VISITED_REALM
  )

  const numberOfRealms = useDappSelector(selectNumberOfRealms)

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
        <div className="header">Why join a Realm?</div>
        <p className="paragraph">
          Realm Citizens can complete <strong>Challenges</strong>, earn{" "}
          <strong>$XP</strong>, and rank on the Realm&apos;s{" "}
          <strong>Leaderboard</strong>. Prizes await Citizens that top the
          boards.
        </p>
        <p className="paragraph" style={{ marginBottom: 0 }}>
          Survey our {numberOfRealms} Beta Realms and choose the one you can
          dominate. The more $TAHO you stake, the more $XP you earn. The more
          Citizens in each Realm, the more your weekly $XP reward gets diluted.
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
