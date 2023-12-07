import type { ReflectServerOptions } from "@rocicorp/reflect/server"
import { WriteTransaction } from "@rocicorp/reflect"
import { generate } from "@rocicorp/rails"
import { Reflect } from "@rocicorp/reflect/client"
import {
  ReflectClient,
  ReflectCursor,
  ReflectUserInfo,
  reflectClientSchema,
} from "shared/types"
import { Schema } from "zod"
import {
  OrchestrationOptions,
  createOrchestrationMutators,
} from "reflect-orchestrator"

// Source: https://github.com/rocicorp/reflect-draw/blob/main/src/datamodel/zod.ts
function parseReflectState<T>(schema: Schema<T>) {
  return process.env.NODE_ENV !== "production" ? schema.parse : (val: T) => val
}

// Set max room capacity to 50, still displaying 5 at one time
const orchestrationOptions: OrchestrationOptions = {
  maxClientsPerRoom: 50,
}

export const {
  init: initClientState,
  get: getClientState,
  update: updateClientState,
} = generate<ReflectClient>(
  "client-state",
  parseReflectState(reflectClientSchema)
)

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

async function setUserPresence(tx: WriteTransaction, isPresent: boolean) {
  const clientState = await getClientState(tx, tx.clientID)
  await updateClientState(tx, {
    id: tx.clientID,
    ...clientState,
    isPresent,
  })
}

export const mutators = {
  initClientState,
  getClientState,
  updateClientState,
  setCursor,
  setUserInfo,
  setUserPresence,
  ...createOrchestrationMutators(orchestrationOptions),
}

export type ReflectMutators = typeof mutators
export type ReflectInstance = Reflect<ReflectMutators>

const makeOptions = (): ReflectServerOptions<ReflectMutators> => ({
  mutators,
  logLevel: "debug",
})

export default makeOptions
