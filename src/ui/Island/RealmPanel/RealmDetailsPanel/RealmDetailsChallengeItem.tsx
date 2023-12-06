import React from "react"
import Markdown from "react-markdown"
import Accordion from "shared/components/Accordion"

type RealmDetailsChallengeItemProps = {
  name: string
  description: string
}

export default function RealmDetailsChallengeItem({
  name,
  description,
}: RealmDetailsChallengeItemProps) {
  return (
    <Accordion
      key={name}
      title={name}
      iconColor="var(--primary-p1-100)"
      type="challenge"
      style={{ marginBottom: 14 }}
    >
      <div className="rewards_challenges_description">
        <Markdown>{description}</Markdown>
      </div>
    </Accordion>
  )
}
