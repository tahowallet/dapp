import { WriteTransaction } from "@rocicorp/reflect"
import { generate } from "@rocicorp/rails"
import { Cursor, clientStateSchema, getParse } from "./models"

export const {
  init: initClientState,
  get: getClientState,
  mustGet: mustGetClientState,
  put: putClientState,
  update: updateClientState,
} = generate("client-state", getParse(clientStateSchema))

async function setCursor(
  tx: WriteTransaction,
  coordinates: Cursor
): Promise<void> {
  await updateClientState(tx, { id: tx.clientID, cursor: coordinates })
}

export const mutators = { setCursor, initClientState }

export type ReflectMutators = typeof mutators
