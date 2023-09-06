import React from "react"
import { TransactionProgressStatus } from "shared/types"
import Modal from "../Modal"
import TransactionProgress from "./TransactionProgress"

type TransactionUI = {
  id: string
  title?: string
  buttonLabel?: string
  status: TransactionProgressStatus
  sendTransaction: () => Promise<void>
}

type TransactionsModalProps = {
  title?: string
  transactions?: TransactionUI[]
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
