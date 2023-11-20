import { useEffect } from "react"
import {
  selectDisplayedRealmId,
  selectStakingRealmId,
  selectWalletName,
  useDappSelector,
} from "redux-state"
import { usePresence, useSubscribe } from "@rocicorp/reflect/react"
import { getClientState, reflectInstance } from "shared/utils"
import { getRealmMapData } from "shared/constants"
import { ReflectClient } from "shared/types"

export function useReflect() {
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const realmIcon = stakingRealmId
    ? getRealmMapData(stakingRealmId).partnerIcons.default
    : null

  const stakingRealmColor = stakingRealmId
    ? getRealmMapData(stakingRealmId).color
    : "#2C2C2C"

  const cursorTextColor = stakingRealmId
    ? getRealmMapData(stakingRealmId).cursorText
    : "#FFF"

  useEffect(() => {
    const initReflect = async () => {
      await reflectInstance.mutate.initClientState({
        id: reflectInstance.clientID,
        cursor: null,
        userInfo: { name, realmIcon, stakingRealmColor, cursorTextColor },
      })
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
  }, [name, realmIcon, stakingRealmColor, cursorTextColor])
}

export function useReflectPresence() {
  const presentClientsdIds = usePresence(reflectInstance)
  const presentClients = useSubscribe(
    reflectInstance,
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

  if (!currentUser || maxNumberOfVisibleCursors === undefined) return null

  // Get recently entered users (without current user)
  const otherClients = reflectClients
    .filter((client) => client.id !== currentUser.id)
    .slice(-(+maxNumberOfVisibleCursors - 1))

  // Hide current user cursor when the realm modal is opened
  return realmModalOpened ? otherClients : [currentUser, ...otherClients]
}
