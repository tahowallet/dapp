export type ReflectCursor = {
  x: number
  y: number
}

export type ReflectUserInfo = {
  name: string
  realmName: string | null
  stakingRealmColor: string
  cursorTextColor: string
}

export type ReflectClient = {
  id: string
  cursor: ReflectCursor | null
  userInfo: ReflectUserInfo
  isPresent: boolean
}
