import React, { useState } from "react"
import Icon from "shared/components/Icon"
import assistant from "shared/assets/assistant.png"
import { useTimeout } from "shared/hooks"
// import AssistantWelcome from "./AssistantContent/AssistantWelcome"
// import AssistantQuests from "./AssistantContent/AssistantQuests"
import AssistantJoin from "./AssistantContent/AssistantJoin"

export default function Assistant() {
  const [isContentVisible, setIsContentVisible] = useState(false)

  // Delay content popup for nice animation
  useTimeout(() => setIsContentVisible(true), 500)

  const closeAssistant = () => setIsContentVisible(false)

  return (
    <>
      <div className="assistant">
        <button
          type="button"
          className="assistant_trigger button_reset"
          onClick={() => setIsContentVisible((prevState) => !prevState)}
        >
          <Icon
            src={assistant}
            width="62px"
            height="62px"
            type="image"
            color="currentColor"
          />
        </button>
        {/* <AssistantWelcome
          isVisible={isContentVisible}
          close={closeAssistant}
        /> */}
        {/* <AssistantQuests isVisible={isContentVisible} close={closeAssistant} /> */}
        <AssistantJoin isVisible={isContentVisible} close={closeAssistant} />
      </div>
      <style jsx>{`
        .assistant {
          position: absolute;
          bottom: 25px;
          right: 25px;
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
          left: 14%;
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
