import { ReflectClient, ReflectCursor, ReflectUserInfo } from "shared/types"

export function validateReflectCursor(value: unknown): ReflectCursor | null {
  if (
    value !== null &&
    typeof value === "object" &&
    "x" in value &&
    typeof value.x === "number" &&
    "y" in value &&
    typeof value.y === "number"
  ) {
    return value as ReflectCursor
  }

  return null
}

export function validateReflectUserInfo(value: unknown): ReflectUserInfo {
  const userInfo = value as ReflectUserInfo

  return {
    name: userInfo?.name || "",
    realmIcon:
      typeof userInfo?.realmIcon === "string" || userInfo?.realmIcon === null
        ? userInfo.realmIcon
        : null,
    stakingRealmColor: userInfo?.stakingRealmColor || "",
    cursorTextColor: userInfo?.cursorTextColor || "",
  }
}

export function validateReflectClientState(value: unknown): ReflectClient {
  const clientInfo = value as ReflectClient

  return {
    id: clientInfo?.id || "",
    cursor: validateReflectCursor(clientInfo?.cursor),
    userInfo: validateReflectUserInfo(clientInfo?.userInfo),
  }
}
