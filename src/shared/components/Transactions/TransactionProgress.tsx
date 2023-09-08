import React from "react"
import iconNotifCorrect from "shared/assets/icons/s/notif-correct.svg"
import { TransactionProgressStatus } from "shared/types"
import classNames from "classnames"
import Button from "../Button"
import Ripple from "../Loaders/Ripple"
import Icon from "../Icon"

export type TransactionProgressProps = {
  title?: string
  buttonLabel: string
  disabled?: boolean
  status: TransactionProgressStatus
  sendTransaction: () => Promise<void>
}

type TransactionUIStatus = "not-started" | "in-progress" | "done"

type TransactionStepProps = {
  status: TransactionUIStatus
  title: string
}

const createGetStatusFunction =
  (currentStatus: TransactionProgressStatus) =>
  (status: TransactionProgressStatus): TransactionUIStatus => {
    if (status === currentStatus) {
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
    getLabel: (status: TransactionProgressStatus): string =>
      status <= TransactionProgressStatus.Signing
        ? "Waiting for signature"
        : "Signed",
    getStatus: createGetStatusFunction(TransactionProgressStatus.Signing),
  },
  {
    id: "sending",
    getLabel: (status: TransactionProgressStatus): string =>
      status <= TransactionProgressStatus.Sending
        ? "Sending transaction"
        : "Sent",
    getStatus: createGetStatusFunction(TransactionProgressStatus.Sending),
  },
]

function TransactionStep({ status, title }: TransactionStepProps) {
  return (
    <div className={classNames("step row_center", { [status]: true })}>
      {status !== "done" && <Ripple disabled={status === "not-started"} />}
      {status === "done" && (
        <Icon src={iconNotifCorrect} color="var(--trading-in)" />
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
  disabled,
  status,
  sendTransaction,
}: TransactionProgressProps) {
  const isUninitialized = status === TransactionProgressStatus.Idle
  const isInProgress =
    status > TransactionProgressStatus.Idle &&
    status < TransactionProgressStatus.Done
  const isDone = status === TransactionProgressStatus.Done

  return (
    <div className="progress_container column">
      {title && <h5>{title}</h5>}

      {isUninitialized && (
        <Button
          type="primary"
          size="large"
          isDisabled={disabled}
          onClick={sendTransaction}
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
