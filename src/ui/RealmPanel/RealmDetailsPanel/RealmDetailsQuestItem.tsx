import React from "react"
import Markdown from "react-markdown"
import Accordion from "shared/components/Accordion"

type RealmDetailsQuestItemProps = {
  name: string
  description: string
}

export default function RealmDetailsQuestItem({
  name,
  description,
}: RealmDetailsQuestItemProps) {
  return (
    <Accordion
      key={name}
      title={name}
      iconColor="var(--primary-p1-100)"
      type="quest"
      style={{ marginBottom: 14 }}
    >
      <div className="rewards_quests_description">
        <Markdown>{description}</Markdown>
      </div>
    </Accordion>
  )
}
