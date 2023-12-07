import React, { ReactNode } from "react"
import { animated } from "@react-spring/web"
import { useVisibilityTransition } from "shared/hooks"
import Icon from "shared/components/Media/Icon"
import closeIcon from "shared/assets/icons/s/close.svg"

export type PopupProps = {
  children: ReactNode
  isVisible: boolean
  close: () => void
  leftPosition?: string | number
  bottomPosition: string | number
  rightPosition?: string | number
  width: string | number
  hasPointer?: boolean
  style?: React.CSSProperties
}

type XAxisPsition = {
  left?: string | number
  right?: string | number
}

export default function Popup({
  children,
  isVisible,
  close,
  bottomPosition,
  leftPosition,
  rightPosition,
  width,
  hasPointer = true,
  style,
}: PopupProps) {
  const transition = useVisibilityTransition(isVisible)
  const xPosition: XAxisPsition = {}

  if (leftPosition !== null) xPosition.left = leftPosition
  if (rightPosition !== null) xPosition.right = rightPosition

  return (
    <>
      <animated.div
        style={{
          position: "absolute",
          bottom: bottomPosition,
          background: "#043937",
          borderRadius: 16,
          padding: "24px 32px 32px",
          width,
          pointerEvents: isVisible ? "all" : "none",
          ...transition,
          ...xPosition,
          ...style,
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
          display: ${hasPointer ? "block" : "none"};
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
