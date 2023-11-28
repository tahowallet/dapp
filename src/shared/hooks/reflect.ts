import { useEffect, useState } from "react"
import {
  selectDisplayedRealmId,
  selectRealmNameById,
  selectStakingRealmId,
  selectWalletName,
  useDappSelector,
} from "redux-state"
import { usePresence, useSubscribe } from "@rocicorp/reflect/react"
import {
  ReflectInstance,
  ReflectMutators,
  getClientState,
  mutators,
} from "shared/utils"
import { getRealmMapData } from "shared/constants"
import { RootState } from "redux-state/reducers"
import { Reflect } from "@rocicorp/reflect/client"
import { nanoid } from "@reduxjs/toolkit"

export function useReflect(initializeReflect: boolean) {
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const realmName =
    useDappSelector((state: RootState) =>
      selectRealmNameById(state, stakingRealmId)
    ) ?? null

  const realmMapData = stakingRealmId ? getRealmMapData(stakingRealmId) : null

  const [reflect, setReflect] = useState<ReflectInstance | null>(null)
  const [reflectInitialized, setReflectInitialized] = useState(false)

  const stakingRealmColor = realmMapData?.color ?? "#2C2C2C"
  const cursorTextColor = realmMapData?.cursorText ?? "#FFF"

  useEffect(() => {
    const initReflect = async () => {
      if (!initializeReflect || reflectInitialized) return

      const reflectInstance =
        process.env.DISABLE_REFLECT === "true"
          ? null
          : new Reflect<ReflectMutators>({
              userID: nanoid(),
              roomID: "/",
              server: process.env.REFLECT_SERVER ?? "",
              mutators,
            })

      setReflect(reflectInstance)

      if (!reflectInstance) return

      await reflectInstance.mutate.initClientState({
        id: reflectInstance.clientID,
        cursor: null,
        userInfo: {
          name,
          realmName,
          stakingRealmColor,
          cursorTextColor,
        },
        isPresent: true,
      })

      setReflectInitialized(true)
    }

    const updateUserInfo = async () => {
      if (!reflect) return

      await reflect.mutate.setUserInfo({
        name,
        realmName,
        stakingRealmColor,
        cursorTextColor,
      })
    }

    initReflect()
    updateUserInfo()
  }, [
    reflect,
    name,
    realmName,
    stakingRealmColor,
    cursorTextColor,
    initializeReflect,
    reflectInitialized,
  ])

  useEffect(() => {
    const handleReflectCursor = async (e: MouseEvent) => {
      if (!reflect) return

      await reflect.mutate.setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleReflectCursor)
    return () => window.removeEventListener("mousemove", handleReflectCursor)
  }, [reflect])

  return reflect as ReflectInstance
}

export function useReflectPresence(reflectInstance: ReflectInstance) {
  const presentClientsdIds = usePresence(reflectInstance)
  const presentClients = useSubscribe(
    reflectInstance,
    async (tx) => {
      const clients = await Promise.all(
        presentClientsdIds.map(async (clientID) => {
          const presentClient = await getClientState(tx, clientID)
          return presentClient ? [presentClient] : []
        })
      )

      return clients
        .flatMap((client) => client)
        .filter((client) => client.isPresent)
    },
    [],
    [presentClientsdIds]
  )

  return presentClients
}

export function useReflectCurrentUser(reflectInstance: ReflectInstance) {
  return useSubscribe(
    reflectInstance,
    async (tx) => {
      const currentUser = await getClientState(tx, tx.clientID)
      return currentUser
    },
    null
  )
}

export function useReflectCursors() {
  const reflect = useReflect(true)

  const reflectClients = useReflectPresence(reflect)
  const currentUser = useReflectCurrentUser(reflect)
  const realmModalOpened = useDappSelector(selectDisplayedRealmId)

  // Find index of current user to determine the "room" placement
  const currentUserIndex = reflectClients.findIndex(
    (client) => client.id === currentUser?.id
  )

  // Set max number of visible cursors in .env (or default to 5)
  const maxNumberOfVisibleCursors =
    Number(process.env.REFLECT_MAX_CAPACITY) || 5

  const currentUserRoom = Math.floor(
    currentUserIndex / maxNumberOfVisibleCursors
  )

  const currentRoomValue = currentUserRoom * maxNumberOfVisibleCursors

  // We want users to always have a chance to interact with each other so we split them
  // into "rooms" based on their index in the reflectClients array. This way map stays interactive
  // while still being not overcrowded.
  const visibleClients = reflectClients.slice(
    currentRoomValue,
    currentRoomValue + maxNumberOfVisibleCursors
  )

  // Hide current user cursor when the realm modal is opened
  const visibleCursors = !realmModalOpened
    ? visibleClients
    : visibleClients.filter((client) => client.id !== currentUser?.id)

  return { visibleCursors, currentUser }
}
