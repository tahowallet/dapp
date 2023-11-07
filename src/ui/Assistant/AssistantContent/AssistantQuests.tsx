import React from "react"
import Icon from "shared/components/Icon"
import starIcon from "shared/assets/icons/star-2.svg"
import { useAssistant } from "shared/hooks"
import AsisstantContent from "."

export default function AssistantQuests() {
  const { updateAssistant, assistantVisible } = useAssistant()

  return (
    <>
      <AsisstantContent
        isVisible={assistantVisible("quests")}
        close={() => updateAssistant({ visible: false, type: "default" })}
      >
        <div className="header">Congrats Citizen!</div>
        <div className="hint row">
          <Icon
            src={starIcon}
            height="32px"
            width="32px"
            style={{ marginTop: 9 }}
            type="image"
            color="var(--semantic-success)"
          />
          <p>Now it&apos;s time to complete Quests and earn $XP.</p>
        </div>
        <p className="paragraph">
          Check out the <strong>Quests tab</strong> for details.
        </p>
        <p className="paragraph">
          Your <strong>Guardians</strong> will airdrop you{" "}
          <strong>$XP every Tuesday</strong>... so stay tuned and let us know on
          Discord if you have any questions.
        </p>
      </AsisstantContent>
      <style jsx>{`
        .header {
          font-size: 22px;
          line-height: 32px;
          color: var(--secondary-s1-100);
          font-weight: 600;
          margin-bottom: 16px;
        }
        .paragraph {
          color: var(--secondary-s1-80);
          margin-bottom: 24px;
        }
        .hint {
          margin-bottom: 16px;
        }
        .hint p {
          font-size: 22px;
          font-weight: 600;
          line-height: 32px;
          flex: 1;
          padding-left: 16px;
        }
      `}</style>
    </>
  )
}
