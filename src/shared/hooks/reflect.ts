import { useEffect, useState } from "react"
import {
  selectDisplayedRealmId,
  selectRealmNameById,
  selectStakingRealmId,
  selectWalletName,
  useDappSelector,
} from "redux-state"
import { usePresence, useSubscribe } from "@rocicorp/reflect/react"
import { getClientState, reflectInstance } from "shared/utils"
import { getRealmMapData } from "shared/constants"
import { RootState } from "redux-state/reducers"

export function useReflect() {
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const realmName =
    useDappSelector((state: RootState) =>
      selectRealmNameById(state, stakingRealmId)
    ) ?? null

  const realmMapData = stakingRealmId ? getRealmMapData(stakingRealmId) : null

  const [reflectInitialized, setReflectInitialized] = useState(false)

  const stakingRealmColor = realmMapData?.color ?? "#2C2C2C"
  const cursorTextColor = realmMapData?.cursorText ?? "#FFF"

  useEffect(() => {
    const initReflect = async () => {
      if (reflectInitialized || !reflectInstance) return

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
      if (!reflectInstance) return

      await reflectInstance.mutate.setUserInfo({
        name,
        realmName,
        stakingRealmColor,
        cursorTextColor,
      })
    }

    initReflect()
    updateUserInfo()
  }, [reflectInitialized, name, realmName, stakingRealmColor, cursorTextColor])

  useEffect(() => {
    const handleReflectCursor = async (e: MouseEvent) => {
      if (!reflectInstance) return

      await reflectInstance.mutate.setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleReflectCursor)
    return () => window.removeEventListener("mousemove", handleReflectCursor)
  }, [])
}

export function useReflectPresence() {
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

export function useReflectCurrentUser() {
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
  useReflect()

  const reflectClients = useReflectPresence()
  const currentUser = useReflectCurrentUser()
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
  return !realmModalOpened
    ? visibleClients
    : visibleClients.filter((client) => client.id !== currentUser?.id)
}
