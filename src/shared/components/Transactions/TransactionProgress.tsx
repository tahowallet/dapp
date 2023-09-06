import React from "react"
import iconNotifCorrect from "shared/assets/icons/s/notif-correct.svg"
import { TransactionProgressStatus } from "shared/types"
import classNames from "classnames"
import Button from "../Button"
import Ripple from "../Loaders/Ripple"
import Icon from "../Icon"

type TransactionProgressProps = {
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
      status < TransactionProgressStatus.Broadcasting
        ? "Waiting for signature"
        : "Signed",
    getStatus: (status: TransactionProgressStatus): TransactionUIStatus =>
      status < TransactionProgressStatus.Broadcasting ? "in-progress" : "done",
  },
  {
    id: "broadcasting",
    getLabel: (): string => "Broadcasting",
    getStatus: createGetStatusFunction(TransactionProgressStatus.Broadcasting),
  },
  {
    id: "mining",
    getLabel: (): string => "Mining",
    getStatus: createGetStatusFunction(TransactionProgressStatus.Mining),
  },
]

function TransactionStep({ status, title }: TransactionStepProps) {
  return (
    <div className={classNames("step", { status })}>
      {status !== "done" && <Ripple disabled={status === "not-started"} />}
      {status === "done" && (
        <Icon src={iconNotifCorrect} color="var(--trading-in)" />
      )}
      <span>{title}</span>
      <style jsx>{`
        .step {
          color: var(--trading-in);
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
    <div>
      {title && <h5>{title}</h5>}

      {isUninitialized && (
        <Button
          type="primary"
          size="medium"
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
    </div>
  )
}
