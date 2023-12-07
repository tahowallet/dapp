import React, { ReactElement, ReactNode } from "react"
import Modal from "../../../shared/components/Dialogs/Modal"
import Button from "../../../shared/components/Interface/Button"

type CongratulationsModalProps = {
  children: string | ReactNode
  header: string | ReactNode
  subheader?: string | ReactNode
  buttons: ReactElement<typeof Button> | ReactElement<typeof Button>[]
  close: () => void
}

export default function CongratulationsModal({
  children,
  header,
  subheader,
  buttons,
  close,
}: CongratulationsModalProps) {
  return (
    <>
      <Modal.Container type="fullscreen" onClickOutside={close}>
        <Modal.AnimatedContent>
          <div className="modal">
            <div className="modal_header">
              <h1>{header}</h1>
              {subheader && <div className="modal_subheader">{subheader}</div>}
            </div>
            <div className="modal_content column_center">{children}</div>
            <div className="modal_controls column_center">{buttons}</div>
          </div>
        </Modal.AnimatedContent>
      </Modal.Container>
      <style jsx>{`
        .modal {
          width: 584px;
          background: var(--background-gradient);
          backdrop-filter: blur(26px);
          border-radius: 16px;
        }
        .modal_header {
          padding: 48px 48px 0;
          text-align: center;
        }
        .modal_header h1 {
          font: var(--text-h1);
          text-align: center;
        }
        .modal_subheader {
          margin-top: 8px;
          color: var(--secondary-s1-80);
        }
        .modal_content {
          width: 100%;
          padding: 48px;
          background: var(--primary-p1-100-60);
          margin: 40px 0;
        }
        .modal_controls {
          width: 100%;
          padding: 0 48px 48px;
          gap: 24px;
        }
      `}</style>
    </>
  )
}
