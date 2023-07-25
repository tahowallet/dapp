import React from "react"
import Icon from "../../shared/Icon"
import iconNotifCorrect from "../../shared/assets/icons/s/notif-correct.svg"
import iconStatusCurrent from "../../shared/assets/icons/s/status-current.svg"
import iconStatusUpcoming from "../../shared/assets/icons/s/status-upcoming.svg"
import iconStatusOptional from "../../shared/assets/icons/s/status-optional.svg"

type ClaimingStatus = "done" | "current" | "upcoming" | "optional"

function ClaimingStepIndicator({ status }: { status: ClaimingStatus }) {
  switch (status) {
    case "done":
      return <Icon src={iconNotifCorrect} />
    case "current":
      return <Icon src={iconStatusCurrent} />
    case "upcoming":
      return <Icon src={iconStatusUpcoming} />
    case "optional":
      return <Icon src={iconStatusOptional} />
    default:
      return null
  }
}

export default function ClaimingSteps() {
  return (
    <div className="claiming_steps">
      <div className="claiming_steps_item">
        <ClaimingStepIndicator status="done" />
        <span>Community Pledge</span>
      </div>
      <div className="claiming_steps_item">
        <ClaimingStepIndicator status="current" />
        <span>Delegate</span>
      </div>
      <div className="claiming_steps_item">
        <ClaimingStepIndicator status="upcoming" />
        <span>Claim</span>
      </div>
      <div className="claiming_steps_item">
        <ClaimingStepIndicator status="optional" />
        <span>Region</span>
      </div>
    </div>
  )
}
