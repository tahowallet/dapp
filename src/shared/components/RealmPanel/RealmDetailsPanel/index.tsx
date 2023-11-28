import React from "react"
import Panel from "shared/components/Panel"
import RealmDetailsContent from "./RealmDetailsContent"
import StakeUnstakeSection from "../RealmPanelAccordion/StakeUnstakeSection"
import GuardiansSection from "../RealmPanelAccordion/GuardiansSection"

export default function RealmDetailsPanel() {
  return (
    <Panel.Container style={{ width: 481 }}>
      <RealmDetailsContent />
      <StakeUnstakeSection />
      <GuardiansSection />
    </Panel.Container>
  )
}
