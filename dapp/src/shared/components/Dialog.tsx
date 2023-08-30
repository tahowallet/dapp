import React from "react"
import Modal, { ModalProps } from "./Modal"

/**
 * This Dialog component is a wrapper around the Modal component. The modal allows
 * the dialog to be rendered correctly if the dialog is nested within a modal, even
 * if the nested content has overflow set to hidden, which would normally
 * cause a nested dialog to appear cut off
 */
export default function Dialog({
  children,
  positioning,
  type,
  overlay,
  onClose,
}: {
  children: React.ReactNode
  positioning?: ModalProps["positioning"]
  type?: ModalProps["type"]
  overlay?: ModalProps["overlay"]
  onClose: () => void
}) {
  return (
    <Modal.Container
      positioning={positioning}
      type={type}
      overlay={overlay}
      onClickOutside={onClose}
    >
      <div className="dialog">{children}</div>
      <style jsx>{`
        .dialog {
          border-radius: 16px;
          background: var(
            --gradients-bg-cards,
            radial-gradient(
              57.41% 54.95% at 64.58% 47.64%,
              rgba(27, 97, 94, 0) 0%,
              rgba(27, 97, 94, 0.2) 100%
            ),
            linear-gradient(
              137deg,
              rgba(26, 94, 91, 0.9) 0%,
              rgba(26, 106, 103, 0) 100%
            ),
            rgba(6, 48, 46, 0.5)
          );
          backdrop-filter: blur(26px);
        }
      `}</style>
    </Modal.Container>
  )
}
