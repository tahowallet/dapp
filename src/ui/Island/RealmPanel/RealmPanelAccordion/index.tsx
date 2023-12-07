import React from "react"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import Accordion, {
  CommonAccordion,
} from "shared/components/Interface/Accordion"

export default function RealmDetailsAccordion({
  title,
  children,
  isDisabled,
  openedFromOutside,
  closeOpenedFromOutside,
}: CommonAccordion) {
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  return (
    <Accordion
      title={title}
      type="panel"
      isDisabled={isDisabled}
      hasInteractiveChildren
      openedFromOutside={openedFromOutside}
      closeOpenedFromOutside={closeOpenedFromOutside}
      extraExpand={realmPanelVisible}
    >
      {children}
    </Accordion>
  )
}
