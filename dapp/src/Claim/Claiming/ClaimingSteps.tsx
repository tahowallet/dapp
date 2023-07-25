import React from "react"
import classNames from "classnames"
import Icon from "../../shared/Icon"
import iconNotifCorrect from "../../shared/assets/icons/s/notif-correct.svg"
import iconStatusCurrent from "../../shared/assets/icons/s/status-current.svg"
import iconStatusUpcoming from "../../shared/assets/icons/s/status-upcoming.svg"
import iconStatusOptional from "../../shared/assets/icons/s/status-optional.svg"

type ClaimingStatus = "done" | "current" | "upcoming" | "optional"

const CLAIMING_STEPS = [
  "Community Pledge",
  "Delegate",
  "Claim",
  "Region",
] as const

type ClaimingStep = (typeof CLAIMING_STEPS)[number]

function getStatus(
  step: ClaimingStep,
  currentStep: ClaimingStep
): ClaimingStatus {
  if (step === "Region") {
    return "optional"
  }
  if (step === currentStep) {
    return "current"
  }
  if (CLAIMING_STEPS.indexOf(step) < CLAIMING_STEPS.indexOf(currentStep)) {
    return "done"
  }
  return "upcoming"
}

function ClaimingStepIndicator({ status }: { status: ClaimingStatus }) {
  switch (status) {
    case "done":
      return <Icon src={iconNotifCorrect} color="var(--secondary-s1-60)" />
    case "current":
      return <Icon src={iconStatusCurrent} color="var(--trading-in)" />
    case "upcoming":
      return <Icon src={iconStatusUpcoming} color="var(--secondary-s1-80)" />
    case "optional":
      return <Icon src={iconStatusOptional} color="var(--secondary-s1-80)" />
    default:
      return null
  }
}

export default function ClaimingSteps({
  currentStep,
}: {
  currentStep: ClaimingStep
}) {
  return (
    <>
      <div className="claiming_steps row">
        {CLAIMING_STEPS.map((step) => (
          <React.Fragment key={step}>
            <div
              className={classNames({
                claiming_steps_item: true,
                column_center: true,
                [getStatus(step, currentStep)]: true,
              })}
            >
              <ClaimingStepIndicator status={getStatus(step, currentStep)} />
              <span>{step}</span>
            </div>
            {step !== "Region" && <div className="divider" />}
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        .claiming_steps {
          margin-left: 20px;
          width: 100%;
          justify-content: space-between;
          color: var(--secondary-s1-80);
        }
        .claiming_steps_item {
          max-width: 100px;
          text-wrap: nowrap;
          gap: 8px;
          font-size: 16px;
        }
        .current {
          color: var(--trading-in);
        }
        .done {
          color: var(--secondary-s1-60);
        }
        .divider {
          flex-grow: 1;
          width: 100px;
          height: 1px;
          background-color: var(--secondary-s1-80);
          margin-top: 8px;
        }
      `}</style>
    </>
  )
}
