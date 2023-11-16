import { useEffect, useState } from "react"
import {
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
} from "shared/services"
import { getRealmMapData } from "shared/constants"
import { ReflectClient } from "shared/types"

export function useReflect() {
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const [reflect, setReflect] = useState<ReflectInstance | null>(null)

  const avatar = stakingRealmId
    ? getRealmMapData(stakingRealmId).partnerLogo.default
    : null

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
        userInfo: { name, avatar, stakingRealmColor },
      })
    }

    const updateUserInfo = async () => {
      await reflect.mutate.setUserInfo({
        name,
        avatar,
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
  }, [name, reflect, avatar, stakingRealmColor])

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

export function useReflectCurrentUser(reflect: ReflectInstance) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const currentUser = await getClientState(tx, tx.clientID)
      return currentUser
    },
    null
  )
}

export function useReflectCursors(reflect: ReflectInstance) {
  const reflectClients = useReflectPresence(reflect)
  const currentUser = useReflectCurrentUser(reflect)

  // Set max number of visible cursors in .env
  const maxNumberOfVisibleCursors = process.env.REFLECT_MAX_CAPACITY

  if (!currentUser || maxNumberOfVisibleCursors === undefined) return null

  // Get recently entered users (without current user)
  const otherClients = reflectClients
    .filter((client) => client.id !== currentUser.id)
    .slice(-(+maxNumberOfVisibleCursors - 1))

  return [currentUser, ...otherClients]
}
