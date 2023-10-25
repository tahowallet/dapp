import React, { ReactNode } from "react"
import { animated } from "@react-spring/web"
import { useVisibilityTransition } from "shared/hooks"
import Icon from "shared/components/Icon"
import closeIcon from "shared/assets/icons/s/close.svg"

export type AssistantContentProps = {
  isVisible: boolean
  close: () => void
}

export default function AssistantContent({
  children,
  isVisible,
  close,
}: AssistantContentProps & { children: ReactNode }) {
  const transition = useVisibilityTransition(isVisible)

  return (
    <>
      <animated.div
        style={{
          ...transition,
          position: "absolute",
          bottom: "calc(100% + 16px)",
          right: 0,
          background: "#043937",
          borderRadius: 16,
          padding: "24px 32px 32px",
          width: 375,
          pointerEvents: isVisible ? "all" : "none",
        }}
      >
        <button
          type="button"
          className="close_button button_reset"
          onClick={close}
        >
          <Icon src={closeIcon} width="16px" height="16px" />
        </button>
        <div className="content">{children}</div>
      </animated.div>
      <style jsx>{`
        .close_button {
          position: absolute;
          top: 14px;
          right: 16px;
          padding: 0;
        }
        .content::after {
          content: "";
          background: #043937;
          height: 12px;
          width: 12px;
          position: absolute;
          bottom: -4px;
          right: 26px;
          border-radius: 2px;
          rotate: 45deg;
        }
      `}</style>
    </>
  )
}
