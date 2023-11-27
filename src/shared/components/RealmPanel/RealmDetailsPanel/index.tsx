import React from "react"
import Panel from "shared/components/Panel"
import RealmDetailsContent from "./RealmDetailsContent"

export default function RealmDetailsPanel() {
  return (
    <Panel.Container style={{ width: 481 }}>
      <RealmDetailsContent />
      <Panel.Section>Stake/Unstake</Panel.Section>
      <Panel.Section>Guardians (coming soon)</Panel.Section>
    </Panel.Container>
  )
}
