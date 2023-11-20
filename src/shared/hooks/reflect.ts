import { useEffect, useState } from "react"
import {
  selectDisplayedRealmId,
  selectStakingRealmId,
  selectWalletName,
  useDappSelector,
} from "redux-state"
import { usePresence, useSubscribe } from "@rocicorp/reflect/react"
import { getClientState, reflectInstance } from "shared/utils"
import { getRealmMapData } from "shared/constants"

export function useReflect() {
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const realmMapData = stakingRealmId ? getRealmMapData(stakingRealmId) : null

  const [reflectInitialized, setReflectInitialized] = useState(false)

  const realmIcon = realmMapData?.partnerIcons.default ?? null
  const stakingRealmColor = realmMapData?.color ?? "#2C2C2C"
  const cursorTextColor = realmMapData?.cursorText ?? "#FFF"

  useEffect(() => {
    const initReflect = async () => {
      if (reflectInitialized) return

      await reflectInstance.mutate.initClientState({
        id: reflectInstance.clientID,
        cursor: null,
        userInfo: {
          name,
          realmIcon,
          stakingRealmColor,
          cursorTextColor,
        },
      })

      setReflectInitialized(true)
    }

    const updateUserInfo = async () => {
      await reflectInstance.mutate.setUserInfo({
        name,
        realmIcon,
        stakingRealmColor,
        cursorTextColor,
      })
    }

    initReflect()
    updateUserInfo()

    const handleReflectCursor = async (e: MouseEvent) => {
      await reflectInstance.mutate.setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleReflectCursor)
    return () => window.removeEventListener("mousemove", handleReflectCursor)
  }, [reflectInitialized, name, realmIcon, stakingRealmColor, cursorTextColor])
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

      return clients.flatMap((client) => client)
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

  // Set max number of visible cursors in .env (or default to 10)
  const maxNumberOfVisibleCursors = process.env.REFLECT_MAX_CAPACITY || 10

  if (!currentUser || maxNumberOfVisibleCursors === undefined) return []

  // Get recently entered users (without current user)
  const otherClients = reflectClients
    .filter((client) => client.id !== currentUser.id)
    .slice(-(+maxNumberOfVisibleCursors - 1))

  // Hide current user cursor when the realm modal is opened
  return realmModalOpened ? otherClients : [currentUser, ...otherClients]
}
