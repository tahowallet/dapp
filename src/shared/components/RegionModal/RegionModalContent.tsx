import React from "react"
import Modal from "shared/components/Modal"
import RegionHeader from "./RegionHeader"

export default function RegionModalContent({
  regionId,
  children,
}: {
  regionId: string
  children: React.ReactNode
}) {
  return (
    <Modal.Content>
      <div className="modal_content">
        <RegionHeader regionId={regionId} />
        {children}
      </div>
      <style jsx>
        {`
          .modal_content {
            max-width: 755px;
            padding: 36px 42px;
          }
        `}
      </style>
    </Modal.Content>
  )
}
