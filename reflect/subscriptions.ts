import { useSubscribe } from "@rocicorp/reflect/react"
import { reflectInstance } from "shared/services"
import { getClientState, mustGetClientState } from "./mutators"

export function useUserInfo() {
  return useSubscribe(
    reflectInstance,
    async (tx) => {
      const clientState = await mustGetClientState(tx, tx.clientID)
      return clientState.userInfo
    },
    null
  )
}

export function useCursorPosition() {
  return useSubscribe(
    reflectInstance,
    async (tx) => {
      const clientState = await mustGetClientState(tx, tx.clientID)
      return clientState.cursor
    },
    null
  )
}

export function useClientState() {
  return useSubscribe(
    reflectInstance,
    async (tx) => {
      const clientState = await getClientState(tx, reflectInstance.clientID)
      return clientState
    },
    null
  )
}
