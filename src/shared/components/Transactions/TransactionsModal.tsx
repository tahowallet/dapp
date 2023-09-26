import React from "react"
import Modal from "../Modal"
import TransactionProgress, {
  TransactionProgressProps,
} from "./TransactionProgress"

type TransactionsModalProps = {
  title?: string
  isOpen: boolean
  close: () => void
  transactions?: ({ id: string } & TransactionProgressProps)[]
}

export default function TransactionsModal({
  title = "Signing transactions",
  isOpen,
  close,
  transactions = [],
}: TransactionsModalProps) {
  if (!isOpen) return null

  return (
    <Modal.Container type="fullscreen" onClickOutside={close}>
      <Modal.Content>
        <div className="transactions_container column">
          <h1>{title}</h1>
          {transactions.map(
            ({ id, title: txTitle, buttonLabel = "Sign", status, onClick }) => (
              <TransactionProgress
                key={id}
                title={txTitle}
                buttonLabel={buttonLabel}
                status={status}
                onClick={onClick}
              />
            )
          )}
        </div>
        <style jsx>{`
          .transactions_container {
            padding: 48px;
            gap: 40px;
          }
          .transactions_container h1 {
            font-weight: 500;
          }
        `}</style>
      </Modal.Content>
    </Modal.Container>
  )
}
