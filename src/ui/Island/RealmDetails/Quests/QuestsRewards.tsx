import React from "react"
import Icon from "shared/components/Icon"
import contactsIcon from "shared/assets/icons/m/contacts.svg"
import { LINKS } from "shared/constants"
import QuestItem from "./QuestItem"

export default function QuestsRewards({
  quests,
}: {
  quests: { name: string; description: string }[]
}) {
  return (
    <div>
      <h3 className="header row">
        Weekly Quests
        <div className="header_icon row_center">
          <Icon
            color="var(--secondary-s1-60)"
            src={contactsIcon}
            width="18px"
          />
          <a href={LINKS.RULEBOOK} target="_blank" rel="noreferrer">
            Rulebook
          </a>
        </div>
      </h3>
      <div className="rewards_quests column">
        {quests.map(({ name, description }) => (
          <QuestItem name={name} description={description} />
        ))}
      </div>
      <style jsx>{`
        .header {
          margin-bottom: 8px;
          justify-content: space-between;
        }
        .header_icon {
          color: var(--secondary-s1-60);
          font: var(--text-label);
          gap: 8px;
        }
        .rewards_quests {
          gap: 20px;
        }
        .rewards_quests_description {
          color: var(--secondary-s1-80);
          padding: 0 16px 0px 25px;
        }
      `}</style>
    </div>
  )
}
