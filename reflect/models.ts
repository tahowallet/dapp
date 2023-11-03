import { z } from "zod"

export const cursorSchema = z.union([
  z.object({
    x: z.number(),
    y: z.number(),
  }),
  z.null(),
])

export const userInfoSchema = z.object({
  name: z.string(),
  avatar: z.union([z.string(), z.null()]),
})

export const clientStateSchema = z.object({
  id: z.string(),
  cursor: cursorSchema,
  userInfo: userInfoSchema,
})

export function getParse<T>(schema: z.Schema<T>) {
  return process.env.NODE_ENV !== "production" ? schema.parse : (val: T) => val
}

export type Cursor = z.infer<typeof cursorSchema>
export type UserInfo = z.infer<typeof userInfoSchema>
export type ClientState = z.infer<typeof clientStateSchema>
