import React, { useCallback } from "react"
import Markdown from "react-markdown"
import Accordion from "shared/components/Accordion"
import starIcon from "shared/assets/icons/star.svg"
import newQuestLabel from "shared/assets/new-quest-label.svg"
import Icon from "shared/components/Icon"
import { Quest } from "shared/types"
import { useDisplayedQuests } from "shared/hooks/quest"

export default function QuestItem({ id, name, description, isNew }: Quest) {
  const { isQuestDisplayed, updateDisplayedQuest } = useDisplayedQuests()

  const handleQuestClick = useCallback(() => {
    if (!isNew) return
    updateDisplayedQuest(id)
  }, [id, isNew, updateDisplayedQuest])

  return (
    <div style={{ position: "relative" }}>
      {isNew && !isQuestDisplayed(id) && (
        <Icon
          src={newQuestLabel}
          type="image"
          height="70px"
          width="100px"
          style={{
            position: "absolute",
            left: -52,
            top: 8,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
      <Accordion
        key={name}
        title={name}
        icon={starIcon}
        iconColor="var(--semantic-success)"
        type="frame"
        onClick={handleQuestClick}
      >
        <div className="rewards_quests_description">
          <Markdown>{description}</Markdown>
        </div>
      </Accordion>
    </div>
  )
}
