export type ReflectCursor = {
  x: number
  y: number
} | null

export type ReflectUserInfo = {
  name: string
  avatar: string | null
  stakingRealmColor: string | null
}

export type ReflectClient = {
  id: string
  cursor: ReflectCursor
  userInfo: ReflectUserInfo
}
