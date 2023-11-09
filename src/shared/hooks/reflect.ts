import { useEffect, useState } from "react"
import {
  selectStakingRealmId,
  selectWalletName,
  useDappSelector,
} from "redux-state"
import { getRealmMapData } from "shared/constants"
import { Reflect } from "@rocicorp/reflect/client"
import { nanoid } from "@reduxjs/toolkit"
import { useSubscribe } from "@rocicorp/reflect/react"
import {
  ReflectInstance,
  ReflectMutators,
  mutators,
  getClientState,
} from "../../../reflect/mutators"

export function useReflect() {
  const name = useDappSelector(selectWalletName)
  const stakingRealmId = useDappSelector(selectStakingRealmId)

  const realmData = stakingRealmId ? getRealmMapData(stakingRealmId) : null
  const avatar = realmData?.partnerLogo.default ?? null

  const [reflect, setReflect] = useState<ReflectInstance | null>(null)

  useEffect(() => {
    const reflectInstance = new Reflect<ReflectMutators>({
      userID: nanoid(),
      roomID: "/",
      server: "http://localhost:8080",
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
        userInfo: { name, avatar },
      })
    }

    const updateUserInfo = async () => {
      await reflect.mutate.setUserInfo({ name, avatar })
    }

    initReflect()
    updateUserInfo()

    const handleReflectCursor = async (e: MouseEvent) => {
      await reflect.mutate.setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleReflectCursor)
    return () => window.removeEventListener("mousemove", handleReflectCursor)
  }, [name, avatar, reflect])

  return reflect
}

export function useReflectUserInfo(reflect: ReflectInstance) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const clientState = await getClientState(tx, tx.clientID)
      return clientState ? clientState.userInfo : null
    },
    null
  )
}

export function useReflectCursorPosition(reflect: ReflectInstance) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const clientState = await getClientState(tx, tx.clientID)
      return clientState ? clientState.cursor : null
    },
    null
  )
}
