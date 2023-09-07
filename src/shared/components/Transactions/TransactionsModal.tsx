import React from "react"
import Modal from "../Modal"
import TransactionProgress, {
  TransactionProgressProps,
} from "./TransactionProgress"

type TransactionsModalProps = {
  title?: string
  transactions?: ({ id: string } & TransactionProgressProps)[]
}

export default function TransactionsModal({
  title = "Signing transactions",
  transactions = [],
}: TransactionsModalProps) {
  return (
    <Modal.Container type="map-with-overlay">
      <Modal.Content>
        <h1>{title}</h1>
        {transactions.map(
          ({
            id,
            title: txTitle,
            buttonLabel = "Sign",
            status,
            sendTransaction,
          }) => (
            <TransactionProgress
              key={id}
              title={txTitle}
              buttonLabel={buttonLabel}
              status={status}
              sendTransaction={sendTransaction}
            />
          )
        )}
      </Modal.Content>
    </Modal.Container>
  )
}
