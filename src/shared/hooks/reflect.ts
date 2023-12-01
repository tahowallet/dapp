import { createContext, useContext, useEffect, useMemo, useState } from "react"
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
import { useWalletOnboarding } from "./wallets"

export const reflectSingleton =
  process.env.DISABLE_REFLECT === "true"
    ? null
    : new Reflect<ReflectMutators>({
        userID: nanoid(),
        roomID: "/",
        server: process.env.REFLECT_SERVER ?? "",
        mutators,
      })

const DEFAULT_BG_COLOR = "#2C2C2C"
const DEFAULT_TEXT_COLOR = "#FFF"

export const ReflectContext = createContext<ReflectInstance | null>(null)

export function useInitializeReflect() {
  const reflect = useContext(ReflectContext)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      if (!reflect || initialized) return

      setInitialized(true)

      await reflect.mutate.initClientState({
        id: reflect.clientID,
        cursor: null,
        userInfo: {
          name: "",
          realmName: null,
          stakingRealmColor: DEFAULT_BG_COLOR,
          cursorTextColor: DEFAULT_TEXT_COLOR,
        },
        isPresent: true,
      })
    }

    initialize()
  }, [reflect, initialized])
}

export function useReflect() {
  const reflect = useContext(ReflectContext)
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)
  const realmName =
    useDappSelector((state: RootState) =>
      selectRealmNameById(state, stakingRealmId)
    ) ?? null

  const { walletOnboarded } = useWalletOnboarding()

  const { color: stakingRealmColor, cursorText: cursorTextColor } =
    useMemo(() => {
      if (stakingRealmId) {
        const { color, cursorText } = getRealmMapData(stakingRealmId)
        return { color, cursorText }
      }
      return {
        color: DEFAULT_BG_COLOR,
        cursorText: DEFAULT_TEXT_COLOR,
      }
    }, [stakingRealmId])

  useEffect(() => {
    const updateUserInfo = async () => {
      if (!reflect) return

      await reflect.mutate.setUserInfo({
        name,
        realmName,
        stakingRealmColor,
        cursorTextColor,
      })
    }

    updateUserInfo()
  }, [reflect, name, realmName, stakingRealmColor, cursorTextColor])

  useEffect(() => {
    const handleReflectCursor = async (e: MouseEvent) => {
      if (!reflect) return

      await reflect.mutate.setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleReflectCursor)
    return () => window.removeEventListener("mousemove", handleReflectCursor)
  }, [reflect])

  useEffect(() => {
    const updateReflectPresence = async () => {
      if (!reflect) return

      await reflect.mutate.setUserPresence(!!walletOnboarded)
    }

    updateReflectPresence()
  }, [walletOnboarded, reflect])
}

export function useReflectPresence() {
  const reflect = useContext(ReflectContext)
  const presentClientsdIds = usePresence(reflect)
  const presentClients = useSubscribe(
    reflect,
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
  const reflect = useContext(ReflectContext)
  return useSubscribe(
    reflect,
    async (tx) => {
      const currentUser = await getClientState(tx, tx.clientID)
      return currentUser
    },
    null
  )
}

export function useReflectCursors() {
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
  const visibleCursors = !realmModalOpened
    ? visibleClients
    : visibleClients.filter((client) => client.id !== currentUser?.id)

  return { visibleCursors, currentUser }
}
