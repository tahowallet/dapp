/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReflectServerOptions } from "@rocicorp/reflect/server"
import { WriteTransaction } from "@rocicorp/reflect"
import { generate } from "@rocicorp/rails"
import { Reflect } from "@rocicorp/reflect/client"
import { validateReflectClientState } from "shared/utils/validators"
import { ReflectCursor, ReflectUserInfo } from "shared/types"

function getParse<T>(validator: (val: any) => T) {
  return process.env.NODE_ENV !== "production" ? validator : (val: T) => val
}

export const {
  init: initClientState,
  get: getClientState,
  update: updateClientState,
} = generate("client-state", getParse(validateReflectClientState))

async function setCursor(
  tx: WriteTransaction,
  coordinates: ReflectCursor
): Promise<void> {
  await updateClientState(tx, { id: tx.clientID, cursor: coordinates })
}

async function setUserInfo(
  tx: WriteTransaction,
  userInfo: ReflectUserInfo
): Promise<void> {
  await updateClientState(tx, {
    id: tx.clientID,
    userInfo,
  })
}

export const mutators = { initClientState, setCursor, setUserInfo }

export type ReflectMutators = typeof mutators
export type ReflectInstance = Reflect<ReflectMutators>

const makeOptions = (): ReflectServerOptions<ReflectMutators> => ({
  mutators,
  logLevel: "debug",
})

export default makeOptions
