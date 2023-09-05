import React from "react"
import Icon from "shared/components/Icon"
import iconNotifCorrect from "shared/assets/icons/s/notif-correct.svg"
import iconStatusCurrent from "shared/assets/icons/s/status-current.svg"
import iconStatusUpcoming from "shared/assets/icons/s/status-upcoming.svg"
import classNames from "classnames"
import { ClaimJourneyStatus } from "shared/types"
import { selectClaimJourneyStep, useSelector } from "redux-state"
import AccountInfo from "Nav/AccountInfo"

const CLAIM_STEP_TO_LABEL: { [key in Partial<ClaimJourneyStatus>]: string } = {
  pledge: "Pledge",
  region: "Join Region",
  claim: "Claim",
  "not-started": "",
  done: "",
}

const CLAIMING_STEPS_LABELS = Object.values(CLAIM_STEP_TO_LABEL).filter(Boolean)

type ClaimingIndicatorStatus = "done" | "current" | "upcoming"

const STEP_INDICATOR: {
  [key in ClaimingIndicatorStatus]: {
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
}

function getStatus(
  stepLabel: string,
  currentStep: ClaimJourneyStatus
): ClaimingIndicatorStatus {
  if (CLAIM_STEP_TO_LABEL[currentStep] === stepLabel) {
    return "current"
  }
  if (
    CLAIMING_STEPS_LABELS.indexOf(stepLabel) <
    CLAIMING_STEPS_LABELS.indexOf(CLAIM_STEP_TO_LABEL[currentStep])
  ) {
    return "done"
  }
  return "upcoming"
}

export default function ClaimingJourney() {
  const currentStep = useSelector(selectClaimJourneyStep)

  return (
    <div className="journey row">
      <span>Your journey</span>
      <div className="journey_elements row">
        {CLAIMING_STEPS_LABELS.map((stepLabel) => {
          const status = getStatus(stepLabel, currentStep)

          return (
            <React.Fragment key={stepLabel}>
              <div
                className={classNames("element column_center", {
                  [status]: true,
                })}
              >
                <Icon
                  src={STEP_INDICATOR[status].src}
                  color={STEP_INDICATOR[status].color}
                />
                <span>{stepLabel}</span>
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <AccountInfo disabled hideRegion />
      <style jsx>
        {`
          .journey {
            border-radius: 16px;
            background: var(--primary-p1-100);
            padding: 24px 26px;
            align-items: center;
            justify-content: space-between;
          }
          .journey_elements {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: var(--secondary-s1-60);
          }
          .element {
            gap: 10px;
          }
          .current {
            color: var(--trading-in);
          }
        `}
      </style>
    </div>
  )
}
