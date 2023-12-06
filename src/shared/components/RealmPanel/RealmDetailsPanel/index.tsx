import React, { useState } from "react"
import RealmDetailsContent from "./RealmDetailsContent"
import StakeUnstakeSection from "../RealmPanelAccordion/StakeUnstakeSection"
import GuardiansSection from "../RealmPanelAccordion/GuardiansSection"

export default function RealmDetailsPanel() {
  const [stakeSectionOpenedFromOutside, setStakeSectionOpenedFromOutside] =
    useState(false)

  return (
    <>
      <RealmDetailsContent
        triggerStakeSectionOpen={() => setStakeSectionOpenedFromOutside(true)}
      />
      <StakeUnstakeSection
        openedFromOutside={stakeSectionOpenedFromOutside}
        closeOpenedFromOutside={() => setStakeSectionOpenedFromOutside(false)}
      />
      <GuardiansSection />
    </>
  )
}
