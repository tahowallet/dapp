import React, { CSSProperties, ReactNode } from "react"
import Popup from "shared/components/Dialogs/Popup"

type AssistantContentProps = {
  children: ReactNode
  isVisible: boolean
  close: () => void
  style?: CSSProperties
}

export default function AssistantContent({
  children,
  isVisible,
  close,
  style,
}: AssistantContentProps) {
  return (
    <Popup
      isVisible={isVisible}
      close={close}
      style={style}
      bottomPosition="calc(100% + 16px)"
      rightPosition={0}
      width={375}
    >
      {children}
    </Popup>
  )
}
