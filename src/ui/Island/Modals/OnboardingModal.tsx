import React, { ReactNode } from "react"
import Modal from "../../../shared/components/Dialogs/Modal"
import Button from "../../../shared/components/Interface/Button"

type OnboardingModalProps = {
  children: ReactNode
  buttonLabel?: ReactNode
  onClick?: () => void
}

export default function OnboardingModal({
  children,
  buttonLabel,
  onClick,
}: OnboardingModalProps) {
  return (
    <>
      <Modal.Container type="island-without-overlay">
        <Modal.Content
          style={{
            width: 428,
            height: 428,
            justifyContent: "center",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            padding: "8px 48px",
            textAlign: "center",
            backdropFilter: "blur(26px)",
            background: "var(--background-gradient)",
          }}
        >
          <div className="column_center">
            <div className="label">{children}</div>
            {buttonLabel && (
              <Button size="large" onClick={onClick}>
                {buttonLabel}
              </Button>
            )}
          </div>
        </Modal.Content>
      </Modal.Container>
      <style jsx>{`
        .label {
          font: var(--text-h1);
          margin-bottom: ${buttonLabel ? "24px" : "0"};
        }
      `}</style>
    </>
  )
}
