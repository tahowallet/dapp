/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReflectClient, ReflectCursor, ReflectUserInfo } from "shared/types"

export function validateReflectCursor(value: any): ReflectCursor {
  if (
    typeof value === "object" &&
    typeof value.x === "number" &&
    typeof value.y === "number"
  ) {
    return value as ReflectCursor
  }

  return null
}

export function validateReflectUserInfo(value: any): ReflectUserInfo {
  return {
    name: value.name || "",
    avatar:
      typeof value.avatar === "string" || value.avatar === null
        ? value.avatar
        : null,
    stakingRealmColor:
      typeof value.stakingRealmColor === "string" ||
      value.stakingRealmColor === null
        ? value.stakingRealmColor
        : null,
  }
}

export function validateReflectClientState(value: any): ReflectClient {
  return {
    id: value.id || "",
    cursor: validateReflectCursor(value.cursor),
    userInfo: validateReflectUserInfo(value.userInfo),
  }
}
