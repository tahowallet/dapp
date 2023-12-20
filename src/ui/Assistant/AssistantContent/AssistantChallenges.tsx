import React from "react"
import Icon from "shared/components/Media/Icon"
import starIcon from "shared/assets/icons/star-2.svg"
import { useAssistant } from "shared/hooks"
import AssistantContent from "."

export default function AssistantChallenges() {
  const { updateAssistant, assistantVisible } = useAssistant()

  return (
    <>
      <AssistantContent
        isVisible={assistantVisible("challenges")}
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
          <p>Now it&apos;s time to complete Challenges and earn $XP.</p>
        </div>
        <p className="paragraph">
          Check out the <strong>Challenges tab</strong> for details.
        </p>
        <p className="paragraph">
          Your <strong>Guardians</strong> will airdrop you{" "}
          <strong>$XP every Thursday</strong>... so stay tuned and let us know
          on Discord if you have any questions.
        </p>
      </AssistantContent>
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
