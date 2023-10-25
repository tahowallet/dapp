import { Network } from "@ethersproject/networks"
import { ethers, logger } from "ethers"
import { Logger, defineReadOnly } from "ethers/lib/utils"
import { TransactionProgressStatus } from "shared/types"

// eslint-disable-next-line import/prefer-default-export
export const isTransactionPending = (status: TransactionProgressStatus) =>
  status === TransactionProgressStatus.Approving ||
  status === TransactionProgressStatus.Signing ||
  status === TransactionProgressStatus.Sending

export const getAllowanceTransactionID = (id: string) => `${id}_allowance`

export class StaticJsonBatchRpcProvider extends ethers.providers
  .JsonRpcBatchProvider {
  override async detectNetwork(): Promise<Network> {
    let { network } = this
    if (network == null) {
      network = await super.detectNetwork()

      if (!network) {
        logger.throwError(
          "no network detected",
          Logger.errors.UNKNOWN_ERROR,
          {}
        )
      }

      // If still not set, set it
      // eslint-disable-next-line no-underscore-dangle
      if (this._network == null) {
        // A static network does not support "any"
        defineReadOnly(this, "_network", network)

        this.emit("network", network, null)
      }
    }
    return network
  }
}
