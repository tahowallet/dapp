import { useEffect, useState } from "react"
import {
  selectRealms,
  selectStakingRealmId,
  selectWalletName,
  useDappSelector,
} from "redux-state"
import { Reflect } from "@rocicorp/reflect/client"
import { nanoid } from "@reduxjs/toolkit"
import { usePresence, useSubscribe } from "@rocicorp/reflect/react"
import {
  ReflectInstance,
  ReflectMutators,
  mutators,
  getClientState,
  ReflectClient,
} from "shared/services"
import { getRealmMapData } from "shared/constants"

export function useReflect() {
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const realms = useDappSelector(selectRealms)

  const [reflect, setReflect] = useState<ReflectInstance | null>(null)

  const stakingRealm = stakingRealmId ? realms[stakingRealmId].name : null
  const stakingRealmColor = stakingRealmId
    ? getRealmMapData(stakingRealmId).color
    : null

  useEffect(() => {
    const reflectInstance = new Reflect<ReflectMutators>({
      userID: nanoid(),
      roomID: "/",
      server: process.env.REFLECT_SERVER ?? "",
      mutators,
    })

    setReflect(reflectInstance)
  }, [])

  useEffect(() => {
    if (!reflect) return () => {}

    const initReflect = async () => {
      await reflect.mutate.initClientState({
        id: reflect.clientID,
        cursor: null,
        userInfo: { name, stakingRealm, stakingRealmColor },
      })
    }

    const updateUserInfo = async () => {
      await reflect.mutate.setUserInfo({
        name,
        stakingRealm,
        stakingRealmColor,
      })
    }

    initReflect()
    updateUserInfo()

    const handleReflectCursor = async (e: MouseEvent) => {
      await reflect.mutate.setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleReflectCursor)
    return () => window.removeEventListener("mousemove", handleReflectCursor)
  }, [name, reflect, stakingRealm, stakingRealmColor])

  return reflect
}

export function useReflectPresence(reflect: ReflectInstance) {
  const presentClientsdIds = usePresence(reflect)
  const presentClients = useSubscribe(
    reflect,
    async (tx) => {
      const clients: ReflectClient[] = []

      presentClientsdIds.forEach(async (clientID) => {
        const presentClient = await getClientState(tx, clientID)
        if (presentClient) clients.push(presentClient)
      })

      return clients
    },
    [],
    [presentClientsdIds]
  )

  return presentClients
}

export function useReflectCurrentUserId(reflect: ReflectInstance) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const currentUser = await getClientState(tx, tx.clientID)
      return currentUser ? currentUser.id : null
    },
    null
  )
}
