import React, { useState } from "react"
import Panel from "shared/components/Panel"
import RealmDetailsContent from "./RealmDetailsContent"
import StakeUnstakeSection from "../RealmPanelAccordion/StakeUnstakeSection"
import GuardiansSection from "../RealmPanelAccordion/GuardiansSection"

export default function RealmDetailsPanel() {
  const [stakeSectionOpenedFromOutside, setStakeSectionOpenedFromOutside] =
    useState(false)

  return (
    <Panel.Container style={{ width: 481 }}>
      <RealmDetailsContent
        triggerStakeSectionOpen={() => setStakeSectionOpenedFromOutside(true)}
      />
      <StakeUnstakeSection
        openedFromOutside={stakeSectionOpenedFromOutside}
        closeOpenedFromOutside={() => setStakeSectionOpenedFromOutside(false)}
      />
      <GuardiansSection />
    </Panel.Container>
  )
}
