import React, { ReactElement, ReactNode } from "react"
import Modal from "../Modal"
import Button from "../Button"

type CongratulationsModalProps = {
  children: string | ReactNode
  header: string | ReactNode
  subheader?: string | ReactNode
  button: ReactElement<typeof Button> | ReactElement<typeof Button>[]
}

export default function CongratulationsModal({
  children,
  header,
  subheader,
  button,
}: CongratulationsModalProps) {
  return (
    <>
      <Modal.Container type="map-with-overlay">
        <Modal.Content>
          <div className="modal">
            <div className="modal_header">
              <h1>{header}</h1>
              {subheader && <div className="modal_subheader">{subheader}</div>}
            </div>
            <div className="modal_content">{children}</div>
            <div className="modal_controls">{button}</div>
          </div>
        </Modal.Content>
      </Modal.Container>
      <style jsx>{`
        .modal {
          width: 584px;
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
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .modal_controls {
          width: 100%;
          padding: 0 48px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
      `}</style>
    </>
  )
}
