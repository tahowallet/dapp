import React from "react"
import OnboardingModal from "ui/Island/Modals/OnboardingModal"
import Icon from "shared/components/Media/Icon"
import newTab from "shared/assets/icons/m/new-tab.svg"
import { LINKS } from "shared/constants"

export default function JoinWaitlist({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.SHOW_WAITLIST === "true")
    return (
      <OnboardingModal
        buttonLabel={
          <>
            Join Beta{" "}
            <Icon src={newTab} color="#000" height="24px" width="24px" />
          </>
        }
        onClick={() => window.open(LINKS.WAITLIST)}
      >
        {children}
      </OnboardingModal>
    )

  return <OnboardingModal>{children}</OnboardingModal>
}
