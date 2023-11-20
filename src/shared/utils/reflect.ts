/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReflectServerOptions } from "@rocicorp/reflect/server"
import { WriteTransaction } from "@rocicorp/reflect"
import { generate } from "@rocicorp/rails"
import { Reflect } from "@rocicorp/reflect/client"
import { validateReflectClientState } from "shared/utils/validators"
import { ReflectCursor, ReflectUserInfo } from "shared/types"
import { nanoid } from "@reduxjs/toolkit"

function getParse<T>(validator: (val: any) => T) {
  return process.env.NODE_ENV !== "production" ? validator : (val: T) => val
}

export const {
  init: initClientState,
  get: getClientState,
  update: updateClientState,
  delete: deleteClientState,
  list: listClientState,
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

async function deleteUser(tx: WriteTransaction): Promise<void> {
  await deleteClientState(tx, tx.clientID)
}

export const mutators = {
  initClientState,
  getClientState,
  updateClientState,
  deleteClientState,
  listClientState,
  setCursor,
  setUserInfo,
  deleteUser,
}

export type ReflectMutators = typeof mutators
export type ReflectInstance = Reflect<ReflectMutators>

export const reflectInstance = new Reflect<ReflectMutators>({
  userID: nanoid(),
  roomID: "/",
  server: process.env.REFLECT_SERVER ?? "",
  mutators,
})

const makeOptions = (): ReflectServerOptions<ReflectMutators> => ({
  mutators,
  logLevel: "debug",
})

export default makeOptions
