import React from "react"
import OnboardingModal from "shared/components/Modals/OnboardingModal"
import Icon from "shared/components/Icon"
import newTab from "shared/assets/icons/m/new-tab.svg"
import { LINKS } from "shared/constants"

export default function JoinWaitlist() {
  return (
    <OnboardingModal
      buttonLabel={
        <>
          Join waitlist{" "}
          <Icon src={newTab} color="#000" height="24px" width="24px" />
        </>
      }
      onClick={() => window.open(LINKS.WAITLIST)}
    >
      The portal
      <br /> is closed at the <br /> moment.
    </OnboardingModal>
  )
}
