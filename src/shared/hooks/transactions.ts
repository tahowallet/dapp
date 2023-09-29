import { useEffect } from "react"
import { SECOND } from "shared/constants"
import { TransactionProgressStatus } from "shared/types"

// eslint-disable-next-line import/prefer-default-export
export function useTransactionSuccessCallback(
  status: TransactionProgressStatus,
  // callback should be stable, preferably useCallback
  callback: () => void,
  delay = SECOND
) {
  useEffect(() => {
    if (status === TransactionProgressStatus.Done) {
      setTimeout(callback, delay)
    }
  }, [status, callback, delay])
}
