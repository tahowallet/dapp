import { ethers } from "ethers"

export enum TransactionProgressStatus {
  Idle,
  Approving,
  Approved,
  Signing,
  Sending,
  Done,
  Failed,
}

/**
 * Defines a function that builds a transaction request.
 * The function is used to write new data to the blockchain.
 *
 * @param provider The provider to use to build the transaction request.
 * @param account The account of the user that is sending the transaction.
 * @param data Parameters needed to build the transaction.
 *
 * @returns A Promise resolving to the transaction request or null if
 * the transaction request failed to build.
 */
export type WriteTransactionBuilder<T> = (
  provider: ethers.providers.Provider,
  account: string,
  data: T
) => Promise<ethers.providers.TransactionRequest | null>

/**
 * Defines a function that builds a request to read some data from the blockchain.
 *
 * @param provider The provider to use to build the request.
 * @param data Parameters needed to build the request.
 *
 * @returns A Promise resolving to the response from the blockchain.
 */
export type ReadTransactionBuilder<T, Response> = (
  provider: ethers.providers.Provider,
  data: T
) => Promise<Response>
