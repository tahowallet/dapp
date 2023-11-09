import { WriteTransaction } from "@rocicorp/reflect"
import { generate } from "@rocicorp/rails"
import { Reflect } from "@rocicorp/reflect/client"
import { Cursor, clientStateSchema, getParse } from "./models"

export const {
  init: initClientState,
  get: getClientState,
  update: updateClientState,
} = generate("client-state", getParse(clientStateSchema))

async function setCursor(
  tx: WriteTransaction,
  coordinates: Cursor
): Promise<void> {
  await updateClientState(tx, { id: tx.clientID, cursor: coordinates })
}

async function setUserInfo(
  tx: WriteTransaction,
  userInfo: { name: string; avatar: string | null }
): Promise<void> {
  await updateClientState(tx, {
    id: tx.clientID,
    userInfo,
  })
}

export const mutators = { initClientState, setCursor, setUserInfo }

export type ReflectMutators = typeof mutators
export type ReflectInstance = Reflect<ReflectMutators>
