import React from "react"
import Markdown from "react-markdown"
import Accordion from "shared/components/Accordion"
import starIcon from "shared/assets/icons/star.svg"
import newQuestLabel from "shared/assets/new-quest-label.svg"
import Icon from "shared/components/Icon"

type QuestItemProps = {
  name: string
  description: string
}

export default function QuestItem({ name, description }: QuestItemProps) {
  return (
    <div style={{ position: "relative" }}>
      <Icon
        src={newQuestLabel}
        type="image"
        height="70px"
        width="100px"
        style={{ position: "absolute", left: -52, top: 8, zIndex: 2 }}
      />
      <Accordion
        key={name}
        title={name}
        icon={starIcon}
        iconColor="var(--semantic-success)"
        type="frame"
      >
        <div className="rewards_quests_description">
          <Markdown>{description}</Markdown>
        </div>
      </Accordion>
    </div>
  )
}
