import React from "react"
import Icon from "shared/components/Icon"
import assistant from "shared/assets/assistant.png"
import Portal from "shared/components/Portal"
import {
  selectAssistant,
  setAssistant,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import AssistantWelcome from "./AssistantContent/AssistantWelcome"
import AssistantQuests from "./AssistantContent/AssistantQuests"
import AssistantJoin from "./AssistantContent/AssistantJoin"

export default function Assistant() {
  const { welcomePopup, questsPopup } = useDappSelector(selectAssistant)
  const dispatch = useDappDispatch()

  const toggleAssistant = () => {
    if (!welcomePopup.closed) {
      dispatch(setAssistant("close-welcome"))
    } else if (questsPopup.staked && !questsPopup.closed) {
      dispatch(setAssistant("close-quests"))
    } else {
      dispatch(setAssistant("toggle-popup"))
    }
  }

  return (
    <>
      <Portal>
        <div className="assistant">
          <button
            type="button"
            className="assistant_trigger button_reset"
            onClick={toggleAssistant}
          >
            <Icon
              src={assistant}
              width="62px"
              height="62px"
              type="image"
              color="currentColor"
            />
          </button>
          <AssistantWelcome />
          <AssistantQuests />
          <AssistantJoin />
        </div>
      </Portal>
      <style jsx>{`
        .assistant {
          position: absolute;
          bottom: 25px;
          right: 25px;
          z-index: 999999999;
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
