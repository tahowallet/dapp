import React from "react"
import Modal from "shared/components/Dialogs/Modal"
import Icon from "shared/components/Media/Icon"
import lightIcon from "shared/assets/icons/m/light.svg"
import Button from "shared/components/Interface/Button"

import TransactionProgress, {
  TransactionProgressProps,
} from "shared/components/Transactions/TransactionProgress"
import { isTransactionPending } from "shared/utils"
import { selectRealmById, useDappSelector } from "redux-state"

type ModalLeavingRealmProps = {
  realmId: string
  transaction: TransactionProgressProps
  close: () => void
}

export default function ModalLeavingRealm({
  realmId,
  close,
  transaction,
}: ModalLeavingRealmProps) {
  const realm = useDappSelector((state) => selectRealmById(state, realmId))

  const isPending = isTransactionPending(transaction.status)

  return (
    <>
      <Modal.Container type="fullscreen" onClickOutside={close}>
        <Modal.AnimatedContent>
          <div className="modal">
            <h1 className="modal_header">Leaving {realm?.name}</h1>
            <div className="modal_infobox">
              <div className="modal_hint row_center">
                <Icon src={lightIcon} type="image" width="24px" height="24px" />
                <p className="modal_hint_text">Keep in mind</p>
              </div>
              <p style={{ paddingRight: 5 }}>
                If you leave {realm?.name} now, you are{" "}
                <span>giving up the rewards</span> that you would receive this
                week.
              </p>
            </div>
            <div className="modal_controls">
              {isPending || (
                <Button size="large" onClick={close}>
                  I&apos;ll stay
                </Button>
              )}
              <TransactionProgress
                title={isPending ? "Unstaking" : ""}
                buttonSize="large"
                buttonType="secondary"
                buttonLabel="Yes, I want to leave"
                status={transaction.status}
                onClick={transaction.onClick}
              />
            </div>
          </div>
        </Modal.AnimatedContent>
      </Modal.Container>
      <style jsx>{`
        .modal {
          padding: 48px;
          width: 488px;
          box-sizing: content-box;
          backdrop-filter: blur(26px);
          background: var(--background-gradient);
          border-radius: 16px;
        }
        .modal_header {
          font: var(--text-h1);
          margin-bottom: 24px;
        }
        .modal_infobox {
          padding: 16px;
          color: var(--secondary-s1-60);
          background: var(--primary-p1-40);
          border-radius: 8px;
          margin-bottom: 40px;
        }
        .modal_infobox span {
          color: var(--secondary-s1-100);
        }
        .modal_hint {
          margin-bottom: 8px;
        }
        .modal_hint_text {
          color: var(--semantic-attention);
          flex: 1;
          margin-top: 2px;
          margin-left: 4px;
        }
        .modal_controls {
          display: flex;
          gap: 24px;
        }
      `}</style>
    </>
  )
}
