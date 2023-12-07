import React from "react"
import iconNotifCorrect from "shared/assets/icons/m/notif-correct.svg"
import iconNotifWrong from "shared/assets/icons/m/notif-wrong.svg"
import { TransactionProgressStatus } from "shared/types"
import classNames from "classnames"
import { isTransactionPending } from "shared/utils"
import Button from "../Interface/Button"
import Ripple from "../Loaders/Ripple"
import Icon from "../Media/Icon"

export type TransactionProgressProps = {
  title?: string
  buttonLabel: string
  buttonType?: "primary" | "secondary"
  buttonSize?: "large" | "medium"
  disabled?: boolean
  status: TransactionProgressStatus
  onClick: () => void
}

type TransactionUIStatus = "not-started" | "in-progress" | "done" | "failed"

type TransactionStepProps = {
  status: TransactionUIStatus
  title: string
}

const createGetStatusFunction =
  (currentStatus: TransactionProgressStatus) =>
  (status: TransactionProgressStatus): TransactionUIStatus => {
    if (
      status === currentStatus ||
      (currentStatus === TransactionProgressStatus.Signing &&
        status === TransactionProgressStatus.Approving)
    ) {
      return "in-progress"
    }
    if (status > currentStatus) {
      return "done"
    }
    return "not-started"
  }

const statusToElementProps = [
  {
    id: "signing",
    getLabel: (status: TransactionProgressStatus): string => {
      if (status === TransactionProgressStatus.Approving) return "Approving"
      if (status === TransactionProgressStatus.Approved) return "Signed"

      if (status === TransactionProgressStatus.Signing)
        return "Waiting for signature"

      return "Signed"
    },
    getStatus: createGetStatusFunction(TransactionProgressStatus.Signing),
  },
  {
    id: "sending",
    getLabel: (): string => "Sending transaction",
    getStatus: createGetStatusFunction(TransactionProgressStatus.Sending),
  },
]

function TransactionStep({ status, title }: TransactionStepProps) {
  return (
    <div className={classNames("step row_center", { [status]: true })}>
      {status !== "done" && status !== "failed" && (
        <Ripple disabled={status === "not-started"} />
      )}
      {status === "done" && (
        <Icon width="24px" src={iconNotifCorrect} color="var(--trading-in)" />
      )}
      {status === "failed" && (
        <Icon width="24px" src={iconNotifWrong} color="var(--semantic-error)" />
      )}
      <span>{title}</span>
      <style jsx>{`
        .step {
          color: var(--secondary-s1-100);
          gap: 8px;
          transition: 100ms color, 100ms opacity;
        }
        .step.done {
          color: var(--trading-in);
        }
        .step.failed {
          color: var(--semantic-error);
        }
        .step.not-started {
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}

export default function TransactionProgress({
  title,
  buttonLabel,
  buttonType = "primary",
  buttonSize = "large",
  disabled,
  status,
  onClick,
}: TransactionProgressProps) {
  const isUninitialized = status === TransactionProgressStatus.Idle
  const isInProgress = isTransactionPending(status)
  const isDone = status === TransactionProgressStatus.Done
  const hasFailed = status === TransactionProgressStatus.Failed

  return (
    <div className="progress_container column">
      {title && <h5>{title}</h5>}

      {(isUninitialized || hasFailed) && (
        <Button
          type={buttonType}
          size={buttonSize}
          isDisabled={disabled}
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      )}

      {isInProgress &&
        statusToElementProps.map(({ id, getLabel, getStatus }) => (
          <TransactionStep
            key={id}
            status={getStatus(status)}
            title={getLabel(status)}
          />
        ))}

      {isDone && <TransactionStep key="done" status="done" title="Done" />}
      {hasFailed && (
        <TransactionStep
          key="failed"
          status="failed"
          title="Transaction failed, try again"
        />
      )}
      <style jsx>{`
        .progress_container {
          gap: 16px;
        }
        .progress_container h5 {
          font-size: 22px;
          font-style: normal;
          font-weight: 500;
          line-height: 32px;
        }
      `}</style>
    </div>
  )
}
