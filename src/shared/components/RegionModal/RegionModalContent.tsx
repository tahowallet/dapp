import React from "react"
import Modal from "shared/components/Modal"
import { selectIsJoinRegionMapMode } from "redux-state/selectors/map"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames"
import { useHistory } from "react-router-dom"
import { resetMap } from "redux-state/slices/map"
import { setSelectedRegionId } from "redux-state/slices/claim"
import RegionHeader from "./RegionHeader"
import Button from "../Button"

export default function RegionModalContent({
  regionId,
  children,
  onClose,
}: {
  regionId: string
  children: React.ReactNode
  onClose: () => void
}) {
  const isJoinRegionMode = useSelector(selectIsJoinRegionMapMode)

  const location = useHistory()
  const dispatch = useDispatch()

  const handleClose = () => {
    onClose()
    dispatch(resetMap())
    dispatch(setSelectedRegionId(regionId))
    location.push("/claim/claiming/sign")
  }
  return (
    <Modal.Content>
      <div className="modal">
        <div
          className={classNames("modal_header", {
            row_end: isJoinRegionMode,
          })}
        >
          <RegionHeader regionId={regionId} />
          {isJoinRegionMode && (
            <div>
              <Button onClick={handleClose} type="primary" size="large">
                Choose this region
              </Button>
            </div>
          )}
        </div>
        <div
          className={classNames("modal_content", {
            dark: isJoinRegionMode,
          })}
        >
          {children}
        </div>
      </div>
      <style jsx>
        {`
          .modal {
            max-width: 755px;
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
