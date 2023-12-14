import React, { ReactNode } from "react"
import Modal from "shared/components/Dialogs/Modal"
import GetUpdates from "./GetUpdates"
import ClaimYourNFT from "./ClaimYourNFT"
import BetaEndCloseButton from "./BetaEndCloseButton"

type BetaEndModalProps = {
  header: ReactNode
  children: ReactNode
  onClose?: () => void
}

export default function BetaEndModal({
  header,
  children,
  onClose,
}: BetaEndModalProps) {
  return (
    <>
      <Modal.ScrollableContainer
        type="island-without-overlay"
        topSpacing="150px"
      >
        <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 860, position: "relative" }}>
            <div className="modal_header_container">
              <h1 className="modal_header">{header}</h1>
              <div style={{ paddingInline: 20 }}>{children}</div>
            </div>
            <div className="modal_actions row">
              <ClaimYourNFT />
              <GetUpdates />
            </div>
            {onClose && <BetaEndCloseButton onClose={onClose} />}
          </div>
        </Modal.Content>
      </Modal.ScrollableContainer>
      <style jsx>{`
        .modal_header_container {
          background: var(--background-gradient);
          backdrop-filter: blur(26px);
          text-align: center;
          padding: 49px 63px 40px;
          border-radius: 16px 16px 0 0;
        }
        .modal_header {
          font-family: var(--serif);
          font-size: 52px;
          font-weight: 500;
          line-height: 42px;
          letter-spacing: 1.04px;
          margin-bottom: 32px;
        }
        .modal_actions {
          background: var(--primary-p1-100);
          padding: 36px 0 40px;
          width: 100%;
          border-radius: 0 0 16px 16px;
          position: relative;
        }
        .modal_actions::after {
          content: "";
          opacity: 0.4;
          background: #557473;
          width: 1px;
          height: 152px;
          position: absolute;
          left: 50%;
          top: 45px;
          transform: translateX(-50%);
        }
      `}</style>
    </>
  )
}
