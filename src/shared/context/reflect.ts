/* eslint-disable import/prefer-default-export */
import { createContext } from "react"
import { ReflectInstance } from "shared/utils"

export const ReflectContext = createContext<ReflectInstance | null>(null)
