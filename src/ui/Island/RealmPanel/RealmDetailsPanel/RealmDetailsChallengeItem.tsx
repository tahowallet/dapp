import React, { useCallback } from "react"
import Markdown from "react-markdown"
import Accordion from "shared/components/Interface/Accordion"
import { useDisplayedChallenges } from "shared/hooks"

type RealmDetailsChallengeItemProps = {
  id: string
  name: string
  description: string
  isNew?: boolean
}

export default function RealmDetailsChallengeItem({
  id,
  name,
  description,
  isNew,
}: RealmDetailsChallengeItemProps) {
  const { updateDisplayedChallenge } = useDisplayedChallenges()

  const handleChallengeClick = useCallback(() => {
    if (!isNew) return
    updateDisplayedChallenge(id)
  }, [id, isNew, updateDisplayedChallenge])

  return (
    <Accordion
      key={name}
      title={name}
      iconColor="var(--primary-p1-100)"
      type="challenge"
      onClick={handleChallengeClick}
      style={{ marginBottom: 14 }}
    >
      <div className="rewards_challenges_description">
        <Markdown>{description}</Markdown>
      </div>
    </Accordion>
  )
}
