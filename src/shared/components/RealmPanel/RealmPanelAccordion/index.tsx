import React from "react"
import Accordion, { CommonAccordion } from "shared/components/Accordion"

export default function RealmDetailsAccordion({
  title,
  children,
  isDisabled,
  openedFromOutside,
  closeOpenedFromOutside,
}: CommonAccordion) {
  return (
    <Accordion
      title={title}
      type="panel"
      isDisabled={isDisabled}
      hasInteractiveChildren
      openedFromOutside={openedFromOutside}
      closeOpenedFromOutside={closeOpenedFromOutside}
    >
      {children}
    </Accordion>
  )
}
