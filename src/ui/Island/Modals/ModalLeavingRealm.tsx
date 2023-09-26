import React from "react"
import Modal from "shared/components/Modal"
import Icon from "shared/components/Icon"
import lightIcon from "shared/assets/icons/m/light.svg"
import Button from "shared/components/Button"

import { getRealmDetails } from "shared/constants"

type ModalLeavingRealmProps = {
  realmId: string
  close: () => void
}

export default function ModalLeavingRealm({
  realmId,
  close,
}: ModalLeavingRealmProps) {
  const { name: realmName } = getRealmDetails(realmId)

  return (
    <>
      <Modal.Container type="fullscreen" onClickOutside={close}>
        <Modal.AnimatedContent>
          <div className="modal">
            <h1 className="modal_header">Leaving {realmName}</h1>
            <div className="modal_infobox">
              <div className="modal_hint row_center">
                <Icon src={lightIcon} type="image" width="24px" height="24px" />
                <p className="modal_hint_text">Keep in mind</p>
              </div>
              <p style={{ paddingRight: 5 }}>
                If you leave {realmName} now, you are{" "}
                <span>giving up the rewards</span> that you would receive this
                week.
              </p>
              <p>
                You also <span>can&apos;t join another realm for 3 days.</span>
              </p>
            </div>
            <div className="modal_controls">
              <Button size="large" onClick={close}>
                I&apos;ll stay
              </Button>
              <Button size="large" type="secondary">
                Yes, I want to leave
              </Button>
            </div>
          </div>
        </Modal.AnimatedContent>
      </Modal.Container>
      <style jsx>{`
        .modal {
          padding: 48px;
          width: 488px;
          box-sizing: content-box;
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
