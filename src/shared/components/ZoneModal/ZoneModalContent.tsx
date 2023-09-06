import React from "react"
import Modal from "shared/components/Modal"
import ZoneHeader from "./ZoneHeader"

export default function ZoneModalContent({
  zoneId,
  children,
}: {
  zoneId: string
  children: React.ReactNode
}) {
  return (
    <Modal.Content>
      <div className="modal_content">
        <ZoneHeader zoneId={zoneId} />
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
