import React, { ReactNode } from "react"
import Accordion from "shared/components/Accordion"

type RealmDetailsAccordionProps = {
  title: string
  children: ReactNode
  isDisabled?: boolean
}

export default function RealmDetailsAccordion({
  title,
  children,
  isDisabled,
}: RealmDetailsAccordionProps) {
  return (
    <Accordion
      title={title}
      type="panel"
      isDisabled={isDisabled}
      hasInteractiveChildren
    >
      {children}
    </Accordion>
  )
}
