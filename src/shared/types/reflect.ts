import { z } from "zod"

export const reflectCursorSchema = z.object({
  x: z.number(),
  y: z.number(),
})

export const reflectUserInfoSchema = z.object({
  name: z.string(),
  realmName: z.union([z.string(), z.null()]),
  stakingRealmColor: z.string(),
  cursorTextColor: z.string(),
})

export const reflectClientSchema = z.object({
  id: z.string(),
  cursor: z.union([reflectCursorSchema, z.null()]),
  userInfo: reflectUserInfoSchema,
  isPresent: z.boolean(),
})

export type ReflectCursor = z.infer<typeof reflectCursorSchema>
export type ReflectUserInfo = z.infer<typeof reflectUserInfoSchema>
export type ReflectClient = z.infer<typeof reflectClientSchema>
