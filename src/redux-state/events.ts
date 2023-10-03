import { TransactionService } from "shared/services"
import { updateTransactionStatus } from "./slices/wallet"
import store from "./store"

TransactionService.emitter.on("updateTransactionStatus", (status) => {
  store.dispatch(updateTransactionStatus(status))
})
