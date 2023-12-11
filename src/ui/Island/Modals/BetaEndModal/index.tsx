import React, { ReactNode } from "react"
import Modal from "shared/components/Dialogs/Modal"
import GetUpdates from "./GetUpdates"
import ClaimYourNFT from "./ClaimYourNFT"

type BetaEndModalProps = {
  header: ReactNode
  description: ReactNode
}

export default function BetaEndModal({
  header,
  description,
}: BetaEndModalProps) {
  return (
    <>
      <Modal.ScrollableContainer
        type="island-without-overlay"
        topSpacing="150px"
      >
        <Modal.Content style={{ width: 860 }}>
          <div className="modal_header_container">
            <h1 className="modal_header">{header}</h1>
            <p style={{ paddingInline: 24 }}>{description}</p>
          </div>
          <div className="modal_actions row">
            <ClaimYourNFT />
            <GetUpdates />
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
        }
      `}</style>
    </>
  )
}