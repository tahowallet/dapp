import React from "react"
// import { isTransactionPending } from "shared/utils"
import Modal from "../Dialogs/Modal"
import TransactionProgress, {
  TransactionProgressProps,
} from "./TransactionProgress"

type TransactionsModalProps = {
  title?: React.ReactNode
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
  // The following code is used to auto trigger the first transaction
  // when staking (we need to bring it back after beta release and refactor it a bit)

  // const [transactionInProgress, setTransactionInProgress] = useState(false)

  // // If there is no other transaction in progress, trigger the first transaction immediately
  // useEffect(() => {
  //   if (!isOpen || !transactions.length || transactionInProgress) return
  //   transactions[0].onClick()
  //   setTransactionInProgress(true)
  // }, [isOpen, transactions, transactionInProgress])

  // useEffect(() => {
  //   if (isTransactionPending(transactions[0].status))
  //     setTransactionInProgress(true)
  // }, [transactions])

  // const closeModal = useCallback(() => {
  //   setTransactionInProgress(false)
  //   close()
  // }, [close])

  if (!isOpen) return null

  return (
    <Modal.Container type="fullscreen" onClickOutside={close}>
      <Modal.AnimatedContent>
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
            min-width: 500px;
            gap: 40px;
            background: var(--background-gradient);
            backdrop-filter: blur(26px);
            border-radius: 16px;
          }
          .transactions_container h1 {
            font-weight: 500;
          }
        `}</style>
      </Modal.AnimatedContent>
    </Modal.Container>
  )
}
