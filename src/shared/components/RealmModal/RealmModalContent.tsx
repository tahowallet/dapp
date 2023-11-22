import React from "react"
import Modal from "shared/components/Modal"
import {
  selectDisplayedRealmId,
  selectIsJoinRealmIslandMode,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import classNames from "classnames"
import { useHistory } from "react-router-dom"
import { resetIslandDisplay } from "redux-state/slices/island"
import { setSelectedRealmId } from "redux-state/slices/claim"
import { ROUTES } from "shared/constants"
import RealmHeader from "./RealmHeader"
import Button from "../Button"

export default function RealmModalContent({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) {
  const isJoinRealmMode = useDappSelector(selectIsJoinRealmIslandMode)
  const realmId = useDappSelector(selectDisplayedRealmId)

  const location = useHistory()
  const dispatch = useDappDispatch()

  if (!realmId) return null

  const handleClose = () => {
    onClose()
    dispatch(resetIslandDisplay())
    dispatch(setSelectedRealmId(realmId))
    location.push(ROUTES.CLAIM.DETAILS_SIGN)
  }

  return (
    <Modal.Content>
      <div className="modal">
        <div
          className={classNames("modal_header", {
            row_end: isJoinRealmMode,
          })}
        >
          <RealmHeader />
          {isJoinRealmMode && (
            <div>
              <Button onClick={handleClose} type="primary" size="large">
                Choose this realm
              </Button>
            </div>
          )}
        </div>
        <div
          className={classNames("modal_content", {
            dark: isJoinRealmMode,
          })}
        >
          {children}
        </div>
      </div>
      <style jsx>
        {`
          .modal {
            width: 755px;
            margin-inline: auto;
            backdrop-filter: blur(26px);
            border-radius: 16px;
            color: #e4eeee;
            background: radial-gradient(
                57.41% 54.95% at 64.58% 47.64%,
                rgba(27, 97, 94, 0) 0%,
                rgba(27, 97, 94, 0.2) 100%
              ),
              linear-gradient(
                137deg,
                rgba(26, 94, 91, 0.9) 0%,
                rgba(26, 106, 103, 0) 100%
              ),
              rgba(6, 48, 46, 0.5);
          }

          .modal_header {
            padding: 36px 42px 0;
            margin-bottom: 24px;
          }

          .row_end {
            display: flex;
            align-items: end;
            gap: 16px;
          }

          .modal_content {
            padding: 0 42px 36px;
          }

          .dark {
            background-color: var(--primary-p1-100-60);
            border-radius: 0 0 16px 16px;
          }
        `}
      </style>
    </Modal.Content>
  )
}
