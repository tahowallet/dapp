import React from "react"
import Button from "shared/components/Interface/Button"
import closeIcon from "shared/assets/icons/s/close-black.svg"

export default function BetaEndCloseButton({
  onClose,
}: {
  onClose: () => void
}) {
  return (
    <Button
      type="close"
      iconSrc={closeIcon}
      onClick={onClose}
      style={{
        padding: 12,
        position: "absolute",
        top: -20,
        right: -20,
        filter:
          "drop-shadow(0px 2px 4px rgba(7, 17, 17, 0.34)) drop-shadow(0px 6px 8px rgba(7, 17, 17, 0.24)) drop-shadow(0px 16px 16px rgba(7, 17, 17, 0.30))",
      }}
    />
  )
}
