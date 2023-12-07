import React from "react"
import classNames from "classnames"
import Icon from "shared/components/Media/Icon"
import iconNotifCorrect from "shared/assets/icons/s/notif-correct.svg"
import iconStatusCurrent from "shared/assets/icons/s/status-current.svg"
import iconStatusUpcoming from "shared/assets/icons/s/status-upcoming.svg"
import iconStatusOptional from "shared/assets/icons/s/status-optional.svg"

type ClaimingStatus = "done" | "current" | "upcoming" | "optional"

const CLAIMING_STEPS = ["Community Pledge", "Claim", "Realm"] as const

type ClaimingStep = (typeof CLAIMING_STEPS)[number]

const STEP_INDICATOR: {
  [key in ClaimingStatus]: {
    src: string
    color: string
  }
} = {
  done: {
    src: iconNotifCorrect,
    color: "var(--secondary-s1-60)",
  },
  current: {
    src: iconStatusCurrent,
    color: "var(--trading-in)",
  },
  upcoming: {
    src: iconStatusUpcoming,
    color: "var(--secondary-s1-80)",
  },
  optional: {
    src: iconStatusOptional,
    color: "var(--secondary-s1-80)",
  },
}

function getStatus(
  step: ClaimingStep,
  currentStep: ClaimingStep
): ClaimingStatus {
  if (step === "Realm") {
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

export default function ClaimingSteps({
  currentStep,
}: {
  currentStep: ClaimingStep
}) {
  return (
    <>
      <div className="claiming_steps row">
        {CLAIMING_STEPS.map((step) => {
          const status = getStatus(step, currentStep)
          return (
            <React.Fragment key={step}>
              <div
                className={classNames({
                  claiming_steps_item: true,
                  column_center: true,
                  [getStatus(step, currentStep)]: true,
                })}
              >
                <Icon
                  src={STEP_INDICATOR[status].src}
                  color={STEP_INDICATOR[status].color}
                />
                <span>{step}</span>
              </div>
              {step !== "Realm" && <div className="divider" />}
            </React.Fragment>
          )
        })}
      </div>
      <style jsx>{`
        .claiming_steps {
          margin: 0 20px;
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
