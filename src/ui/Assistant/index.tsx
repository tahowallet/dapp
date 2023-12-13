import React from "react"
import Icon from "shared/components/Media/Icon"
import assistantImage from "shared/assets/assistant.webp"
import { useAssistant } from "shared/hooks"
import AssistantWelcome from "./AssistantContent/AssistantWelcome"
import AssistantChallenges from "./AssistantContent/AssistantChallenges"
import AssistantJoin from "./AssistantContent/AssistantJoin"
import AssistantFirstRealm from "./AssistantContent/AssistantFirstRealm"

export default function Assistant() {
  const { assistant, updateAssistant } = useAssistant()

  if (!assistant) return null

  return (
    <>
      <div className="assistant">
        <div className="assistant_trigger">
          <Icon
            src={assistantImage}
            width="62px"
            height="62px"
            type="image"
            color="currentColor"
            ariaLabel="Assistant"
            onClick={() =>
              updateAssistant({
                visible: !assistant.visible,
                type: "default",
              })
            }
          />
        </div>
        <AssistantWelcome />
        <AssistantChallenges />
        <AssistantJoin />
        <AssistantFirstRealm />
      </div>
      <style jsx>{`
        .assistant {
          position: absolute;
          bottom: 25px;
          right: 25px;
          z-index: var(--z-assistant-icon);
        }
        .assistant_trigger {
          cursor: pointer;
          position: relative;
        }
        .assistant_trigger::before {
          content: "";
          position: absolute;
          height: 54px;
          width: 54px;
          left: 7%;
          top: 6%;
          background: #043937;
          z-index: -1;
          border-radius: 7px;
          transform: rotate(45deg);
        }
      `}</style>
    </>
  )
}
