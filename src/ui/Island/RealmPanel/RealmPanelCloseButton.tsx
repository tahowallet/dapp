import React from "react"
import closeIcon from "shared/assets/icons/s/close-black.svg"
import { animated } from "@react-spring/web"
import { useRealmCloseButtonTransition } from "shared/hooks"
import Button from "../../../shared/components/Interface/Button"
import Portal from "shared/components/Interface/Portal"

export default function RealmPanelCloseButton({
  onClose,
}: {
  onClose: () => void
}) {
  const buttonTransition = useRealmCloseButtonTransition()

  return (
    <Portal>
      <animated.div style={{ ...buttonTransition, position: "absolute" }}>
        <Button
          size="medium"
          type="close"
          iconSrc={closeIcon}
          iconPosition="left"
          onClick={onClose}
        >
          Close view
        </Button>
      </animated.div>
    </Portal>
  )
}
